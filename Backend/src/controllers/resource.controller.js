import Resource from '../models/Resource.model.js';
import { ApiError } from '../middleware/error.middleware.js';
import { emitToAll } from '../config/socket.js';

// @desc    Get all resources
// @route   GET /api/resources
// @access  Public
export const getResources = async (req, res, next) => {
  try {
    const {
      type,
      category,
      subject,
      exam,
      search,
      featured,
      trending,
      page = 1,
      limit = 20,
      sort = '-createdAt',
    } = req.query;

    const query = { isActive: true };

    if (type && type !== 'all') {
      query.type = type;
    }

    if (category && category !== 'all') {
      query.category = category;
    }

    if (subject && subject !== 'all') {
      query.subject = subject;
    }

    if (exam) {
      query.exam = exam;
    }

    if (featured === 'true') {
      query.isFeatured = true;
    }

    if (trending === 'true') {
      query.isTrending = true;
    }

    if (search) {
      query.$text = { $search: search };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    // Build sort object
    let sortObj = {};
    if (sort === 'popular') {
      sortObj = { 'stats.downloads': -1, 'stats.views': -1 };
    } else if (sort === 'rating') {
      sortObj = { 'rating.average': -1 };
    } else if (sort === 'recent') {
      sortObj = { createdAt: -1 };
    } else if (sort === 'downloads') {
      sortObj = { 'stats.downloads': -1 };
    } else {
      sortObj = { [sort.replace('-', '')]: sort.startsWith('-') ? -1 : 1 };
    }

    const resources = await Resource.find(query)
      .populate('exam', 'name category')
      .populate('uploadedBy', 'name')
      .sort(sortObj)
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Resource.countDocuments(query);

    res.json({
      success: true,
      data: {
        resources,
        pagination: {
          page: parseInt(page),
          limit: parseInt(limit),
          total,
          pages: Math.ceil(total / parseInt(limit)),
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single resource
// @route   GET /api/resources/:id
// @access  Public
export const getResource = async (req, res, next) => {
  try {
    const resource = await Resource.findById(req.params.id)
      .populate('exam', 'name fullName category')
      .populate('uploadedBy', 'name avatar')
      .populate('reviews.user', 'name avatar');

    if (!resource) {
      throw new ApiError(404, 'Resource not found');
    }

    // Increment view count
    resource.stats.views += 1;
    resource.updateTrendingStatus();
    await resource.save();

    res.json({
      success: true,
      data: { resource },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get featured resources
// @route   GET /api/resources/featured
// @access  Public
export const getFeaturedResources = async (req, res, next) => {
  try {
    const resources = await Resource.find({
      isActive: true,
      $or: [{ isFeatured: true }, { isTrending: true }],
    })
      .sort({ 'stats.downloads': -1 })
      .limit(10)
      .select('title description type category subject thumbnail stats rating tags isTrending uploaderName createdAt');

    res.json({
      success: true,
      data: { resources },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get trending resources
// @route   GET /api/resources/trending
// @access  Public
export const getTrendingResources = async (req, res, next) => {
  try {
    const resources = await Resource.find({
      isActive: true,
      isTrending: true,
    })
      .sort({ 'stats.views': -1 })
      .limit(10);

    res.json({
      success: true,
      data: { resources },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Search resources
// @route   GET /api/resources/search
// @access  Public
export const searchResources = async (req, res, next) => {
  try {
    const { q, type, category, subject } = req.query;

    if (!q) {
      throw new ApiError(400, 'Search query is required');
    }

    const query = {
      isActive: true,
      $text: { $search: q },
    };

    if (type) query.type = type;
    if (category) query.category = category;
    if (subject) query.subject = subject;

    const resources = await Resource.find(query, {
      score: { $meta: 'textScore' },
    })
      .sort({ score: { $meta: 'textScore' } })
      .limit(20);

    res.json({
      success: true,
      data: { resources },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Record resource download
// @route   POST /api/resources/:id/download
// @access  Public
export const recordDownload = async (req, res, next) => {
  try {
    const resource = await Resource.findByIdAndUpdate(
      req.params.id,
      { $inc: { 'stats.downloads': 1 } },
      { new: true }
    );

    if (!resource) {
      throw new ApiError(404, 'Resource not found');
    }

    resource.updateTrendingStatus();
    await resource.save();

    res.json({
      success: true,
      message: 'Download recorded',
      data: { downloads: resource.stats.downloads },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add review to resource
// @route   POST /api/resources/:id/reviews
// @access  Private
export const addReview = async (req, res, next) => {
  try {
    const { rating, comment } = req.body;

    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      throw new ApiError(404, 'Resource not found');
    }

    // Check if user already reviewed
    const existingReview = resource.reviews.find(
      (r) => r.user.toString() === req.user.id
    );

    if (existingReview) {
      // Update existing review
      existingReview.rating = rating;
      existingReview.comment = comment;
    } else {
      // Add new review
      resource.reviews.push({
        user: req.user.id,
        rating,
        comment,
      });
    }

    resource.calculateAverageRating();
    await resource.save();

    res.json({
      success: true,
      message: 'Review added successfully',
      data: { rating: resource.rating },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create resource
// @route   POST /api/resources
// @access  Private
export const createResource = async (req, res, next) => {
  try {
    const resourceData = {
      ...req.body,
      uploadedBy: req.user.id,
      uploaderName: req.user.name,
    };

    const resource = await Resource.create(resourceData);

    // Emit socket event for new resource
    emitToAll('resource:new', {
      id: resource._id,
      title: resource.title,
      type: resource.type,
    });

    res.status(201).json({
      success: true,
      message: 'Resource created successfully',
      data: { resource },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update resource
// @route   PUT /api/resources/:id
// @access  Private
export const updateResource = async (req, res, next) => {
  try {
    let resource = await Resource.findById(req.params.id);

    if (!resource) {
      throw new ApiError(404, 'Resource not found');
    }

    // Check ownership or admin
    if (
      resource.uploadedBy.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      throw new ApiError(403, 'Not authorized to update this resource');
    }

    resource = await Resource.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.json({
      success: true,
      message: 'Resource updated successfully',
      data: { resource },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete resource
// @route   DELETE /api/resources/:id
// @access  Private
export const deleteResource = async (req, res, next) => {
  try {
    const resource = await Resource.findById(req.params.id);

    if (!resource) {
      throw new ApiError(404, 'Resource not found');
    }

    // Check ownership or admin
    if (
      resource.uploadedBy.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      throw new ApiError(403, 'Not authorized to delete this resource');
    }

    await resource.deleteOne();

    res.json({
      success: true,
      message: 'Resource deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get resource stats (Admin)
// @route   GET /api/resources/stats
// @access  Private/Admin
export const getResourceStats = async (req, res, next) => {
  try {
    const stats = await Resource.aggregate([
      {
        $group: {
          _id: '$type',
          count: { $sum: 1 },
          totalViews: { $sum: '$stats.views' },
          totalDownloads: { $sum: '$stats.downloads' },
          avgRating: { $avg: '$rating.average' },
        },
      },
    ]);

    const totalResources = await Resource.countDocuments();
    const featuredCount = await Resource.countDocuments({ isFeatured: true });
    const trendingCount = await Resource.countDocuments({ isTrending: true });

    res.json({
      success: true,
      data: {
        byType: stats,
        total: totalResources,
        featured: featuredCount,
        trending: trendingCount,
      },
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getResources,
  getResource,
  getFeaturedResources,
  getTrendingResources,
  searchResources,
  recordDownload,
  addReview,
  createResource,
  updateResource,
  deleteResource,
  getResourceStats,
};

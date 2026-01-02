import User from '../models/User.model.js';
import Resource from '../models/Resource.model.js';
import { ApiError } from '../middleware/error.middleware.js';

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getProfile = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
      .populate('targetExams', 'name fullName category importantDates')
      .populate('bookmarks.resource', 'title type category thumbnail stats');

    res.json({
      success: true,
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateProfile = async (req, res, next) => {
  try {
    const { name, phone, preferences } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      {
        name,
        phone,
        preferences,
      },
      { new: true, runValidators: true }
    );

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user bookmarks
// @route   GET /api/users/bookmarks
// @access  Private
export const getBookmarks = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id)
      .populate({
        path: 'bookmarks.resource',
        select: 'title description type category subject thumbnail stats rating tags',
      });

    const bookmarks = user.bookmarks
      .filter((b) => b.resource) // Filter out any null resources
      .map((b) => ({
        ...b.resource.toObject(),
        bookmarkedAt: b.addedAt,
      }));

    res.json({
      success: true,
      data: { bookmarks },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Add bookmark
// @route   POST /api/users/bookmarks/:resourceId
// @access  Private
export const addBookmark = async (req, res, next) => {
  try {
    const { resourceId } = req.params;

    // Check if resource exists
    const resource = await Resource.findById(resourceId);
    if (!resource) {
      throw new ApiError(404, 'Resource not found');
    }

    const user = await User.findById(req.user.id);

    // Check if already bookmarked
    const isBookmarked = user.bookmarks.some(
      (b) => b.resource.toString() === resourceId
    );

    if (isBookmarked) {
      throw new ApiError(400, 'Resource already bookmarked');
    }

    user.bookmarks.push({ resource: resourceId });
    await user.save();

    // Update resource bookmark count
    resource.stats.bookmarks += 1;
    await resource.save();

    res.json({
      success: true,
      message: 'Bookmark added successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Remove bookmark
// @route   DELETE /api/users/bookmarks/:resourceId
// @access  Private
export const removeBookmark = async (req, res, next) => {
  try {
    const { resourceId } = req.params;

    const user = await User.findById(req.user.id);

    const bookmarkIndex = user.bookmarks.findIndex(
      (b) => b.resource.toString() === resourceId
    );

    if (bookmarkIndex === -1) {
      throw new ApiError(404, 'Bookmark not found');
    }

    user.bookmarks.splice(bookmarkIndex, 1);
    await user.save();

    // Update resource bookmark count
    await Resource.findByIdAndUpdate(resourceId, {
      $inc: { 'stats.bookmarks': -1 },
    });

    res.json({
      success: true,
      message: 'Bookmark removed successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user study stats
// @route   GET /api/users/stats
// @access  Private
export const getStudyStats = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id);

    res.json({
      success: true,
      data: {
        stats: user.studyStats,
        progress: user.progress,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update study stats
// @route   PUT /api/users/stats
// @access  Private
export const updateStudyStats = async (req, res, next) => {
  try {
    const { studyHours, completedTopic, subject } = req.body;

    const user = await User.findById(req.user.id);
    const today = new Date().toDateString();
    const lastStudyDate = user.studyStats.lastStudyDate
      ? new Date(user.studyStats.lastStudyDate).toDateString()
      : null;

    // Update study hours
    if (studyHours) {
      user.studyStats.totalStudyHours += studyHours;
    }

    // Update streak
    if (lastStudyDate !== today) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      if (lastStudyDate === yesterday.toDateString()) {
        user.studyStats.currentStreak += 1;
      } else if (lastStudyDate !== today) {
        user.studyStats.currentStreak = 1;
      }

      if (user.studyStats.currentStreak > user.studyStats.longestStreak) {
        user.studyStats.longestStreak = user.studyStats.currentStreak;
      }

      user.studyStats.lastStudyDate = new Date();
    }

    // Update completed topics
    if (completedTopic && subject) {
      user.studyStats.completedTopics += 1;

      const progressIndex = user.progress.findIndex((p) => p.subject === subject);
      if (progressIndex > -1) {
        user.progress[progressIndex].completed += 1;
      } else {
        user.progress.push({ subject, completed: 1, total: 100 });
      }
    }

    await user.save();

    res.json({
      success: true,
      message: 'Stats updated successfully',
      data: {
        stats: user.studyStats,
        progress: user.progress,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Set target exams
// @route   PUT /api/users/target-exams
// @access  Private
export const setTargetExams = async (req, res, next) => {
  try {
    const { examIds } = req.body;

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { targetExams: examIds },
      { new: true }
    ).populate('targetExams', 'name fullName category importantDates');

    res.json({
      success: true,
      message: 'Target exams updated',
      data: { targetExams: user.targetExams },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get recent activity
// @route   GET /api/users/activity
// @access  Private
export const getRecentActivity = async (req, res, next) => {
  try {
    // For now, return mock activity data
    // In production, you would track user activities in a separate collection
    const activities = [
      {
        id: 1,
        type: 'resource_view',
        title: 'Viewed SSC CGL Math Notes',
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 mins ago
      },
      {
        id: 2,
        type: 'bookmark',
        title: 'Bookmarked Railway NTPC Previous Papers',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      },
      {
        id: 3,
        type: 'download',
        title: 'Downloaded Banking Awareness PDF',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 5), // 5 hours ago
      },
    ];

    res.json({
      success: true,
      data: { activities },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get all users (Admin only)
// @route   GET /api/users
// @access  Private/Admin
export const getAllUsers = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 20;
    const skip = (page - 1) * limit;

    const users = await User.find()
      .select('-bookmarks -progress')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const total = await User.countDocuments();

    res.json({
      success: true,
      data: {
        users,
        pagination: {
          page,
          limit,
          total,
          pages: Math.ceil(total / limit),
        },
      },
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getProfile,
  updateProfile,
  getBookmarks,
  addBookmark,
  removeBookmark,
  getStudyStats,
  updateStudyStats,
  setTargetExams,
  getRecentActivity,
  getAllUsers,
};

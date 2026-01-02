import Exam from '../models/Exam.model.js';
import { ApiError } from '../middleware/error.middleware.js';
import { emitToAll } from '../config/socket.js';

// @desc    Get all exams
// @route   GET /api/exams
// @access  Public
export const getExams = async (req, res, next) => {
  try {
    const {
      category,
      status,
      search,
      page = 1,
      limit = 20,
      sort = '-createdAt',
    } = req.query;

    const query = { isActive: true };

    if (category) {
      query.category = category;
    }

    if (status) {
      query.status = status;
    }

    if (search) {
      query.$text = { $search: search };
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const exams = await Exam.find(query)
      .sort(sort)
      .skip(skip)
      .limit(parseInt(limit))
      .select('-subscribers');

    const total = await Exam.countDocuments(query);

    res.json({
      success: true,
      data: {
        exams,
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

// @desc    Get single exam
// @route   GET /api/exams/:id
// @access  Public
export const getExam = async (req, res, next) => {
  try {
    const exam = await Exam.findById(req.params.id);

    if (!exam) {
      throw new ApiError(404, 'Exam not found');
    }

    // Increment view count
    exam.views += 1;
    await exam.save();

    res.json({
      success: true,
      data: { exam },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get exam by slug
// @route   GET /api/exams/slug/:slug
// @access  Public
export const getExamBySlug = async (req, res, next) => {
  try {
    const exam = await Exam.findOne({ slug: req.params.slug, isActive: true });

    if (!exam) {
      throw new ApiError(404, 'Exam not found');
    }

    // Increment view count
    exam.views += 1;
    await exam.save();

    res.json({
      success: true,
      data: { exam },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get exams by category
// @route   GET /api/exams/category/:category
// @access  Public
export const getExamsByCategory = async (req, res, next) => {
  try {
    const { category } = req.params;

    const exams = await Exam.find({ category, isActive: true })
      .sort('-importantDates.examDate')
      .select('-subscribers');

    res.json({
      success: true,
      data: { exams },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get upcoming exams
// @route   GET /api/exams/upcoming
// @access  Public
export const getUpcomingExams = async (req, res, next) => {
  try {
    const today = new Date();

    const exams = await Exam.find({
      'importantDates.examDate': { $gte: today },
      isActive: true,
    })
      .sort('importantDates.examDate')
      .limit(10)
      .select('name fullName category importantDates icon color status');

    res.json({
      success: true,
      data: { exams },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get exam calendar
// @route   GET /api/exams/calendar
// @access  Public
export const getExamCalendar = async (req, res, next) => {
  try {
    const { month, year } = req.query;

    const startDate = new Date(year || new Date().getFullYear(), (month || new Date().getMonth()) - 1, 1);
    const endDate = new Date(year || new Date().getFullYear(), month || new Date().getMonth() + 1, 0);

    const exams = await Exam.find({
      $or: [
        { 'importantDates.examDate': { $gte: startDate, $lte: endDate } },
        { 'importantDates.applicationEndDate': { $gte: startDate, $lte: endDate } },
        { 'importantDates.resultDate': { $gte: startDate, $lte: endDate } },
      ],
      isActive: true,
    }).select('name fullName category importantDates icon color');

    // Format for calendar
    const calendarEvents = [];

    exams.forEach((exam) => {
      if (exam.importantDates?.examDate) {
        calendarEvents.push({
          title: `${exam.name} Exam`,
          date: exam.importantDates.examDate,
          type: 'exam',
          examId: exam._id,
          color: exam.color,
        });
      }
      if (exam.importantDates?.applicationEndDate) {
        calendarEvents.push({
          title: `${exam.name} Application Deadline`,
          date: exam.importantDates.applicationEndDate,
          type: 'deadline',
          examId: exam._id,
          color: '#E9460A',
        });
      }
      if (exam.importantDates?.resultDate) {
        calendarEvents.push({
          title: `${exam.name} Result`,
          date: exam.importantDates.resultDate,
          type: 'result',
          examId: exam._id,
          color: '#99A57D',
        });
      }
    });

    res.json({
      success: true,
      data: { events: calendarEvents },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Subscribe to exam updates
// @route   POST /api/exams/:id/subscribe
// @access  Private
export const subscribeToExam = async (req, res, next) => {
  try {
    const exam = await Exam.findById(req.params.id);

    if (!exam) {
      throw new ApiError(404, 'Exam not found');
    }

    const isSubscribed = exam.subscribers.includes(req.user.id);

    if (isSubscribed) {
      throw new ApiError(400, 'Already subscribed to this exam');
    }

    exam.subscribers.push(req.user.id);
    await exam.save();

    res.json({
      success: true,
      message: 'Subscribed to exam updates',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Unsubscribe from exam updates
// @route   DELETE /api/exams/:id/subscribe
// @access  Private
export const unsubscribeFromExam = async (req, res, next) => {
  try {
    const exam = await Exam.findById(req.params.id);

    if (!exam) {
      throw new ApiError(404, 'Exam not found');
    }

    exam.subscribers = exam.subscribers.filter(
      (sub) => sub.toString() !== req.user.id.toString()
    );
    await exam.save();

    res.json({
      success: true,
      message: 'Unsubscribed from exam updates',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create exam (Admin only)
// @route   POST /api/exams
// @access  Private/Admin
export const createExam = async (req, res, next) => {
  try {
    const exam = await Exam.create(req.body);

    // Emit socket event for new exam
    emitToAll('exam:new', {
      id: exam._id,
      name: exam.name,
      category: exam.category,
    });

    res.status(201).json({
      success: true,
      message: 'Exam created successfully',
      data: { exam },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update exam (Admin only)
// @route   PUT /api/exams/:id
// @access  Private/Admin
export const updateExam = async (req, res, next) => {
  try {
    const exam = await Exam.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!exam) {
      throw new ApiError(404, 'Exam not found');
    }

    // Emit socket event for exam update
    emitToAll('exam:updated', {
      id: exam._id,
      name: exam.name,
    });

    res.json({
      success: true,
      message: 'Exam updated successfully',
      data: { exam },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete exam (Admin only)
// @route   DELETE /api/exams/:id
// @access  Private/Admin
export const deleteExam = async (req, res, next) => {
  try {
    const exam = await Exam.findByIdAndDelete(req.params.id);

    if (!exam) {
      throw new ApiError(404, 'Exam not found');
    }

    res.json({
      success: true,
      message: 'Exam deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get exam categories with counts
// @route   GET /api/exams/categories
// @access  Public
export const getExamCategories = async (req, res, next) => {
  try {
    const categories = await Exam.aggregate([
      { $match: { isActive: true } },
      {
        $group: {
          _id: '$category',
          count: { $sum: 1 },
          exams: { $push: { name: '$name', slug: '$slug' } },
        },
      },
      { $sort: { count: -1 } },
    ]);

    const categoryInfo = {
      ssc: { name: 'SSC', fullName: 'Staff Selection Commission', icon: '📋', color: '#3B82F6' },
      banking: { name: 'Banking', fullName: 'Bank & Insurance Exams', icon: '🏦', color: '#22C55E' },
      railways: { name: 'Railways', fullName: 'Railway Recruitment Board', icon: '🚂', color: '#EF4444' },
      upsc: { name: 'UPSC', fullName: 'Union Public Service Commission', icon: '🎯', color: '#8B5CF6' },
      'state-psc': { name: 'State PSC', fullName: 'State Public Service Commission', icon: '🏛️', color: '#F97316' },
      defence: { name: 'Defence', fullName: 'Defence & Paramilitary', icon: '⚔️', color: '#6366F1' },
      teaching: { name: 'Teaching', fullName: 'Teaching Exams', icon: '📚', color: '#EC4899' },
      other: { name: 'Other', fullName: 'Other Exams', icon: '📄', color: '#6B7280' },
    };

    const formattedCategories = categories.map((cat) => ({
      id: cat._id,
      ...categoryInfo[cat._id],
      count: cat.count,
      exams: cat.exams.slice(0, 7),
    }));

    res.json({
      success: true,
      data: { categories: formattedCategories },
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getExams,
  getExam,
  getExamBySlug,
  getExamsByCategory,
  getUpcomingExams,
  getExamCalendar,
  subscribeToExam,
  unsubscribeFromExam,
  createExam,
  updateExam,
  deleteExam,
  getExamCategories,
};

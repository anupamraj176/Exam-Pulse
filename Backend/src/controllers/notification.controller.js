import Notification from '../models/Notification.model.js';
import { ApiError } from '../middleware/error.middleware.js';
import { emitToAll, emitToUser, emitToExam } from '../config/socket.js';

// @desc    Get all notifications
// @route   GET /api/notifications
// @access  Public
export const getNotifications = async (req, res, next) => {
  try {
    const { type, exam, page = 1, limit = 20 } = req.query;

    const query = { isActive: true };

    if (type) {
      query.type = type;
    }

    if (exam) {
      query.exam = exam;
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);

    const notifications = await Notification.find(query)
      .populate('exam', 'name category')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Notification.countDocuments(query);

    res.json({
      success: true,
      data: {
        notifications,
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

// @desc    Get live ticker notifications
// @route   GET /api/notifications/ticker
// @access  Public
export const getTickerNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find({
      isActive: true,
      $or: [
        { type: 'urgent' },
        { type: 'exam-update' },
        { type: 'result' },
        { type: 'new-vacancy' },
        { type: 'deadline' },
      ],
    })
      .sort({ createdAt: -1 })
      .limit(10)
      .select('title message type priority icon color createdAt');

    res.json({
      success: true,
      data: { notifications },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get user's notifications
// @route   GET /api/notifications/me
// @access  Private
export const getUserNotifications = async (req, res, next) => {
  try {
    const { page = 1, limit = 20, unreadOnly } = req.query;

    const query = {
      isActive: true,
      $or: [
        { targetAudience: 'all' },
        { targetUsers: req.user.id },
        { targetExams: { $in: req.user.targetExams || [] } },
      ],
    };

    const skip = (parseInt(page) - 1) * parseInt(limit);

    let notifications = await Notification.find(query)
      .populate('exam', 'name category')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    // Mark read status
    notifications = notifications.map((notif) => {
      const readEntry = notif.readBy.find(
        (r) => r.user.toString() === req.user.id.toString()
      );
      return {
        ...notif.toObject(),
        isRead: !!readEntry,
        readAt: readEntry?.readAt,
      };
    });

    if (unreadOnly === 'true') {
      notifications = notifications.filter((n) => !n.isRead);
    }

    const total = await Notification.countDocuments(query);
    const unreadCount = notifications.filter((n) => !n.isRead).length;

    res.json({
      success: true,
      data: {
        notifications,
        unreadCount,
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

// @desc    Mark notification as read
// @route   PUT /api/notifications/:id/read
// @access  Private
export const markAsRead = async (req, res, next) => {
  try {
    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      throw new ApiError(404, 'Notification not found');
    }

    // Check if already read
    const alreadyRead = notification.readBy.some(
      (r) => r.user.toString() === req.user.id.toString()
    );

    if (!alreadyRead) {
      notification.readBy.push({ user: req.user.id });
      await notification.save();
    }

    res.json({
      success: true,
      message: 'Notification marked as read',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Mark all notifications as read
// @route   PUT /api/notifications/read-all
// @access  Private
export const markAllAsRead = async (req, res, next) => {
  try {
    const notifications = await Notification.find({
      isActive: true,
      $or: [
        { targetAudience: 'all' },
        { targetUsers: req.user.id },
        { targetExams: { $in: req.user.targetExams || [] } },
      ],
      'readBy.user': { $ne: req.user.id },
    });

    await Promise.all(
      notifications.map((notif) => {
        notif.readBy.push({ user: req.user.id });
        return notif.save();
      })
    );

    res.json({
      success: true,
      message: 'All notifications marked as read',
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Create notification (Admin)
// @route   POST /api/notifications
// @access  Private/Admin
export const createNotification = async (req, res, next) => {
  try {
    const notification = await Notification.create(req.body);

    // Emit socket event based on target audience
    if (notification.targetAudience === 'all') {
      emitToAll('notification:new', {
        id: notification._id,
        title: notification.title,
        message: notification.message,
        type: notification.type,
        icon: notification.icon,
        color: notification.color,
      });
    } else if (notification.targetExams?.length > 0) {
      notification.targetExams.forEach((examId) => {
        emitToExam(examId, 'notification:new', {
          id: notification._id,
          title: notification.title,
          message: notification.message,
          type: notification.type,
        });
      });
    } else if (notification.targetUsers?.length > 0) {
      notification.targetUsers.forEach((userId) => {
        emitToUser(userId, 'notification:new', {
          id: notification._id,
          title: notification.title,
          message: notification.message,
          type: notification.type,
        });
      });
    }

    res.status(201).json({
      success: true,
      message: 'Notification created successfully',
      data: { notification },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update notification (Admin)
// @route   PUT /api/notifications/:id
// @access  Private/Admin
export const updateNotification = async (req, res, next) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!notification) {
      throw new ApiError(404, 'Notification not found');
    }

    res.json({
      success: true,
      message: 'Notification updated successfully',
      data: { notification },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete notification (Admin)
// @route   DELETE /api/notifications/:id
// @access  Private/Admin
export const deleteNotification = async (req, res, next) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);

    if (!notification) {
      throw new ApiError(404, 'Notification not found');
    }

    res.json({
      success: true,
      message: 'Notification deleted successfully',
    });
  } catch (error) {
    next(error);
  }
};

export default {
  getNotifications,
  getTickerNotifications,
  getUserNotifications,
  markAsRead,
  markAllAsRead,
  createNotification,
  updateNotification,
  deleteNotification,
};

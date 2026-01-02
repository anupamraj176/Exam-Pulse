import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Notification title is required'],
      trim: true,
    },
    message: {
      type: String,
      required: [true, 'Notification message is required'],
    },
    type: {
      type: String,
      required: true,
      enum: ['exam-update', 'result', 'admit-card', 'new-vacancy', 'deadline', 'resource', 'system', 'urgent'],
    },
    priority: {
      type: String,
      enum: ['low', 'medium', 'high', 'urgent'],
      default: 'medium',
    },
    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exam',
    },
    resource: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Resource',
    },
    link: {
      type: String,
      trim: true,
    },
    externalLink: {
      type: String,
      trim: true,
    },
    icon: {
      type: String,
      default: '🔔',
    },
    color: {
      type: String,
      default: '#E9460A',
    },
    // For targeted notifications
    targetAudience: {
      type: String,
      enum: ['all', 'subscribers', 'specific-users'],
      default: 'all',
    },
    targetUsers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
    targetExams: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exam',
    }],
    // Read status tracking
    readBy: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      readAt: {
        type: Date,
        default: Date.now,
      },
    }],
    isActive: {
      type: Boolean,
      default: true,
    },
    expiresAt: {
      type: Date,
    },
    // For scraped notifications
    scrapedFrom: {
      source: { type: String },
      url: { type: String },
      originalDate: { type: Date },
    },
  },
  {
    timestamps: true,
  }
);

// Index for efficient queries
notificationSchema.index({ type: 1, isActive: 1, createdAt: -1 });
notificationSchema.index({ exam: 1 });
notificationSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Virtual for relative time
notificationSchema.virtual('timeAgo').get(function () {
  const now = new Date();
  const diff = now - this.createdAt;
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days > 0) return `${days} day${days > 1 ? 's' : ''} ago`;
  if (hours > 0) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
  if (minutes > 0) return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
  return 'Just now';
});

const Notification = mongoose.model('Notification', notificationSchema);

export default Notification;

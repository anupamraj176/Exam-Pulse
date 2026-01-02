import mongoose from 'mongoose';

const resourceSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Resource title is required'],
      trim: true,
      maxlength: [200, 'Title cannot exceed 200 characters'],
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: [true, 'Description is required'],
      maxlength: [1000, 'Description cannot exceed 1000 characters'],
    },
    type: {
      type: String,
      required: true,
      enum: ['notes', 'pyq', 'video', 'mock', 'book', 'other'],
    },
    category: {
      type: String,
      required: true,
    },
    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exam',
    },
    subject: {
      type: String,
      required: true,
      enum: ['math', 'reasoning', 'english', 'gk', 'science', 'polity', 'history', 'geography', 'economy', 'computer', 'other'],
    },
    tags: [{
      type: String,
      trim: true,
    }],
    thumbnail: {
      type: String,
      default: '📚',
    },
    file: {
      url: { type: String },
      publicId: { type: String },
      size: { type: Number },
      format: { type: String },
    },
    externalUrl: {
      type: String,
      trim: true,
    },
    videoUrl: {
      type: String,
      trim: true,
    },
    pages: {
      type: Number,
      default: 0,
    },
    duration: {
      type: String, // For videos
    },
    uploadedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    uploaderName: {
      type: String,
      default: 'Anonymous',
    },
    stats: {
      views: { type: Number, default: 0 },
      downloads: { type: Number, default: 0 },
      bookmarks: { type: Number, default: 0 },
      shares: { type: Number, default: 0 },
    },
    rating: {
      average: { type: Number, default: 0 },
      count: { type: Number, default: 0 },
    },
    reviews: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      rating: {
        type: Number,
        min: 1,
        max: 5,
      },
      comment: String,
      createdAt: {
        type: Date,
        default: Date.now,
      },
    }],
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isTrending: {
      type: Boolean,
      default: false,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    // For scraped resources
    scrapedFrom: {
      source: { type: String },
      url: { type: String },
      lastScraped: { type: Date },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Create slug from title
resourceSchema.pre('save', function (next) {
  if (this.isModified('title')) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
      + '-' + Date.now().toString(36);
  }
  next();
});

// Update trending status based on stats
resourceSchema.methods.updateTrendingStatus = function () {
  const viewThreshold = 1000;
  const downloadThreshold = 500;
  
  if (this.stats.views >= viewThreshold || this.stats.downloads >= downloadThreshold) {
    this.isTrending = true;
  }
};

// Calculate average rating
resourceSchema.methods.calculateAverageRating = function () {
  if (this.reviews.length === 0) {
    this.rating.average = 0;
    this.rating.count = 0;
  } else {
    const sum = this.reviews.reduce((acc, review) => acc + review.rating, 0);
    this.rating.average = (sum / this.reviews.length).toFixed(1);
    this.rating.count = this.reviews.length;
  }
};

// Indexes
resourceSchema.index({ title: 'text', description: 'text', tags: 'text' });
resourceSchema.index({ type: 1, category: 1, subject: 1 });
resourceSchema.index({ 'stats.views': -1, 'stats.downloads': -1 });
resourceSchema.index({ isFeatured: 1, isTrending: 1 });

const Resource = mongoose.model('Resource', resourceSchema);

export default Resource;

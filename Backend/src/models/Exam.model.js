import mongoose from 'mongoose';

const examSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Exam name is required'],
      trim: true,
    },
    fullName: {
      type: String,
      required: [true, 'Full name is required'],
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['ssc', 'banking', 'railways', 'upsc', 'state-psc', 'defence', 'teaching', 'other'],
    },
    description: {
      type: String,
      default: '',
    },
    conductingBody: {
      type: String,
      required: true,
    },
    officialWebsite: {
      type: String,
      trim: true,
    },
    eligibility: {
      minAge: { type: Number },
      maxAge: { type: Number },
      qualification: { type: String },
      other: { type: String },
    },
    examPattern: {
      totalMarks: { type: Number },
      duration: { type: String },
      sections: [{
        name: String,
        questions: Number,
        marks: Number,
      }],
      negativeMarking: { type: Boolean, default: false },
      negativeMarkingValue: { type: Number, default: 0 },
    },
    syllabus: [{
      subject: String,
      topics: [String],
    }],
    importantDates: {
      notificationDate: { type: Date },
      applicationStartDate: { type: Date },
      applicationEndDate: { type: Date },
      examDate: { type: Date },
      admitCardDate: { type: Date },
      resultDate: { type: Date },
    },
    vacancies: {
      total: { type: Number, default: 0 },
      general: { type: Number, default: 0 },
      obc: { type: Number, default: 0 },
      sc: { type: Number, default: 0 },
      st: { type: Number, default: 0 },
      ews: { type: Number, default: 0 },
    },
    applicationFee: {
      general: { type: Number, default: 0 },
      obc: { type: Number, default: 0 },
      sc: { type: Number, default: 0 },
      st: { type: Number, default: 0 },
      female: { type: Number, default: 0 },
    },
    links: {
      notification: { type: String },
      apply: { type: String },
      syllabus: { type: String },
      admitCard: { type: String },
      result: { type: String },
    },
    status: {
      type: String,
      enum: ['upcoming', 'ongoing', 'application-open', 'application-closed', 'completed'],
      default: 'upcoming',
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    year: {
      type: Number,
      default: new Date().getFullYear(),
    },
    subscribers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    }],
    views: {
      type: Number,
      default: 0,
    },
    icon: {
      type: String,
      default: '📋',
    },
    color: {
      type: String,
      default: '#E9460A',
    },
    // For scraped data
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

// Create slug from name before saving
examSchema.pre('save', function (next) {
  if (this.isModified('name')) {
    this.slug = this.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  }
  next();
});

// Virtual for days until exam
examSchema.virtual('daysUntilExam').get(function () {
  if (!this.importantDates?.examDate) return null;
  const today = new Date();
  const examDate = new Date(this.importantDates.examDate);
  const diffTime = examDate - today;
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
});

// Index for better search
examSchema.index({ name: 'text', fullName: 'text', category: 1 });
examSchema.index({ category: 1, status: 1 });
examSchema.index({ 'importantDates.examDate': 1 });

const Exam = mongoose.model('Exam', examSchema);

export default Exam;

import mongoose from 'mongoose';

const studyRoomSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Study room name is required'],
      trim: true,
    },
    description: {
      type: String,
      trim: true,
    },
    exam: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exam',
    },
    subject: {
      type: String,
    },
    host: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    participants: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      joinedAt: {
        type: Date,
        default: Date.now,
      },
      isActive: {
        type: Boolean,
        default: true,
      },
    }],
    maxParticipants: {
      type: Number,
      default: 50,
    },
    isPrivate: {
      type: Boolean,
      default: false,
    },
    password: {
      type: String,
      select: false,
    },
    chat: [{
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      userName: String,
      message: String,
      timestamp: {
        type: Date,
        default: Date.now,
      },
    }],
    sharedResources: [{
      resource: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resource',
      },
      sharedBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
      sharedAt: {
        type: Date,
        default: Date.now,
      },
    }],
    pomodoro: {
      isActive: { type: Boolean, default: false },
      workDuration: { type: Number, default: 25 },
      breakDuration: { type: Number, default: 5 },
      currentPhase: { type: String, enum: ['work', 'break'], default: 'work' },
      startTime: { type: Date },
    },
    tags: [String],
    status: {
      type: String,
      enum: ['active', 'scheduled', 'ended'],
      default: 'active',
    },
    scheduledFor: {
      type: Date,
    },
    endedAt: {
      type: Date,
    },
    stats: {
      totalMessages: { type: Number, default: 0 },
      totalStudyTime: { type: Number, default: 0 }, // in minutes
      peakParticipants: { type: Number, default: 0 },
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual for current participant count
studyRoomSchema.virtual('currentParticipants').get(function () {
  return this.participants.filter(p => p.isActive).length;
});

// Index
studyRoomSchema.index({ exam: 1, status: 1 });
studyRoomSchema.index({ host: 1 });

const StudyRoom = mongoose.model('StudyRoom', studyRoomSchema);

export default StudyRoom;

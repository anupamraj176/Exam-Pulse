import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.model.js';
import Exam from '../models/Exam.model.js';
import Resource from '../models/Resource.model.js';
import Notification from '../models/Notification.model.js';

dotenv.config();

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/exam-pulse');
    console.log('✅ MongoDB Connected for seeding');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1);
  }
};

// Sample data
const exams = [
  {
    name: 'SSC CGL 2025',
    fullName: 'Staff Selection Commission Combined Graduate Level Examination 2025',
    category: 'ssc',
    conductingBody: 'Staff Selection Commission',
    officialWebsite: 'https://ssc.nic.in',
    description: 'SSC CGL is conducted for recruitment to various Group B and Group C posts in Government ministries.',
    eligibility: { minAge: 18, maxAge: 32, qualification: "Bachelor's Degree" },
    examPattern: {
      totalMarks: 200,
      duration: '60 minutes',
      sections: [
        { name: 'General Intelligence & Reasoning', questions: 25, marks: 50 },
        { name: 'General Awareness', questions: 25, marks: 50 },
        { name: 'Quantitative Aptitude', questions: 25, marks: 50 },
        { name: 'English Comprehension', questions: 25, marks: 50 },
      ],
      negativeMarking: true,
      negativeMarkingValue: 0.5,
    },
    importantDates: {
      notificationDate: new Date('2025-01-01'),
      applicationStartDate: new Date('2025-01-15'),
      applicationEndDate: new Date('2025-02-15'),
      examDate: new Date('2025-08-15'),
    },
    vacancies: { total: 7500, general: 3000, obc: 2000, sc: 1125, st: 562, ews: 813 },
    applicationFee: { general: 100, obc: 100, sc: 0, st: 0, female: 0 },
    status: 'application-open',
    icon: '📋',
    color: '#3B82F6',
  },
  {
    name: 'IBPS PO 2025',
    fullName: 'Institute of Banking Personnel Selection Probationary Officer 2025',
    category: 'banking',
    conductingBody: 'IBPS',
    officialWebsite: 'https://www.ibps.in',
    description: 'IBPS PO is conducted for recruitment of Probationary Officers in Public Sector Banks.',
    eligibility: { minAge: 20, maxAge: 30, qualification: "Bachelor's Degree" },
    examPattern: {
      totalMarks: 100,
      duration: '60 minutes',
      sections: [
        { name: 'English Language', questions: 30, marks: 30 },
        { name: 'Quantitative Aptitude', questions: 35, marks: 35 },
        { name: 'Reasoning Ability', questions: 35, marks: 35 },
      ],
      negativeMarking: true,
      negativeMarkingValue: 0.25,
    },
    importantDates: {
      notificationDate: new Date('2025-06-01'),
      applicationStartDate: new Date('2025-06-15'),
      applicationEndDate: new Date('2025-07-15'),
      examDate: new Date('2025-10-05'),
    },
    vacancies: { total: 4500, general: 1800, obc: 1200, sc: 675, st: 337, ews: 488 },
    applicationFee: { general: 850, obc: 850, sc: 175, st: 175, female: 175 },
    status: 'upcoming',
    icon: '🏦',
    color: '#22C55E',
  },
  {
    name: 'RRB NTPC 2025',
    fullName: 'Railway Recruitment Board Non-Technical Popular Categories 2025',
    category: 'railways',
    conductingBody: 'Railway Recruitment Board',
    officialWebsite: 'https://indianrailways.gov.in',
    description: 'RRB NTPC exam is conducted for recruitment to various non-technical posts in Indian Railways.',
    eligibility: { minAge: 18, maxAge: 33, qualification: '12th pass / Graduate' },
    examPattern: {
      totalMarks: 100,
      duration: '90 minutes',
      sections: [
        { name: 'General Awareness', questions: 40, marks: 40 },
        { name: 'Mathematics', questions: 30, marks: 30 },
        { name: 'General Intelligence & Reasoning', questions: 30, marks: 30 },
      ],
      negativeMarking: true,
      negativeMarkingValue: 0.33,
    },
    importantDates: {
      notificationDate: new Date('2025-02-01'),
      applicationStartDate: new Date('2025-02-15'),
      applicationEndDate: new Date('2025-03-15'),
      examDate: new Date('2025-07-01'),
    },
    vacancies: { total: 35000, general: 14000, obc: 9450, sc: 5250, st: 2625, ews: 3675 },
    applicationFee: { general: 500, obc: 500, sc: 250, st: 250, female: 250 },
    status: 'upcoming',
    icon: '🚂',
    color: '#EF4444',
  },
  {
    name: 'UPSC CSE 2025',
    fullName: 'Union Public Service Commission Civil Services Examination 2025',
    category: 'upsc',
    conductingBody: 'UPSC',
    officialWebsite: 'https://www.upsc.gov.in',
    description: 'UPSC CSE is for recruitment to IAS, IPS, IFS and other civil services.',
    eligibility: { minAge: 21, maxAge: 32, qualification: "Bachelor's Degree" },
    examPattern: {
      totalMarks: 400,
      duration: '120 minutes each',
      sections: [
        { name: 'General Studies Paper I', questions: 100, marks: 200 },
        { name: 'CSAT Paper II', questions: 80, marks: 200 },
      ],
      negativeMarking: true,
      negativeMarkingValue: 0.33,
    },
    importantDates: {
      notificationDate: new Date('2025-02-01'),
      applicationStartDate: new Date('2025-02-15'),
      applicationEndDate: new Date('2025-03-15'),
      examDate: new Date('2025-05-25'),
    },
    vacancies: { total: 1000, general: 400, obc: 270, sc: 150, st: 75, ews: 105 },
    applicationFee: { general: 100, obc: 100, sc: 0, st: 0, female: 0 },
    status: 'upcoming',
    icon: '🎯',
    color: '#8B5CF6',
  },
  {
    name: 'SSC CHSL 2025',
    fullName: 'Staff Selection Commission Combined Higher Secondary Level 2025',
    category: 'ssc',
    conductingBody: 'Staff Selection Commission',
    officialWebsite: 'https://ssc.nic.in',
    description: 'SSC CHSL is conducted for recruitment to LDC, JSA, PA, DEO posts.',
    eligibility: { minAge: 18, maxAge: 27, qualification: '12th Pass' },
    examPattern: {
      totalMarks: 200,
      duration: '60 minutes',
      sections: [
        { name: 'General Intelligence', questions: 25, marks: 50 },
        { name: 'English Language', questions: 25, marks: 50 },
        { name: 'Quantitative Aptitude', questions: 25, marks: 50 },
        { name: 'General Awareness', questions: 25, marks: 50 },
      ],
      negativeMarking: true,
      negativeMarkingValue: 0.5,
    },
    importantDates: {
      notificationDate: new Date('2025-03-01'),
      applicationStartDate: new Date('2025-03-15'),
      applicationEndDate: new Date('2025-04-15'),
      examDate: new Date('2025-09-20'),
    },
    vacancies: { total: 4500, general: 1800, obc: 1200, sc: 675, st: 337, ews: 488 },
    applicationFee: { general: 100, obc: 100, sc: 0, st: 0, female: 0 },
    status: 'upcoming',
    icon: '📋',
    color: '#F97316',
  },
  {
    name: 'SBI PO 2025',
    fullName: 'State Bank of India Probationary Officer 2025',
    category: 'banking',
    conductingBody: 'State Bank of India',
    officialWebsite: 'https://sbi.co.in/careers',
    description: 'SBI PO exam is for recruitment of Probationary Officers in SBI.',
    eligibility: { minAge: 21, maxAge: 30, qualification: "Bachelor's Degree" },
    examPattern: {
      totalMarks: 100,
      duration: '60 minutes',
      sections: [
        { name: 'English Language', questions: 30, marks: 30 },
        { name: 'Quantitative Aptitude', questions: 35, marks: 35 },
        { name: 'Reasoning Ability', questions: 35, marks: 35 },
      ],
      negativeMarking: true,
      negativeMarkingValue: 0.25,
    },
    importantDates: {
      notificationDate: new Date('2025-04-01'),
      applicationStartDate: new Date('2025-04-15'),
      applicationEndDate: new Date('2025-05-15'),
      examDate: new Date('2025-11-10'),
    },
    vacancies: { total: 2000, general: 800, obc: 540, sc: 300, st: 150, ews: 210 },
    applicationFee: { general: 750, obc: 750, sc: 125, st: 125, female: 125 },
    status: 'upcoming',
    icon: '🏦',
    color: '#2563EB',
  },
];

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    console.log('🗑️ Clearing existing data...');
    await User.deleteMany({});
    await Exam.deleteMany({});
    await Resource.deleteMany({});
    await Notification.deleteMany({});

    // Create admin user
    console.log('👤 Creating admin user...');
    const adminUser = await User.create({
      name: 'Admin User',
      email: 'admin@exampulse.com',
      phone: '9999999999',
      password: 'Admin@123',
      role: 'admin',
      isVerified: true,
    });

    // Create sample user
    const sampleUser = await User.create({
      name: 'Test User',
      email: 'user@exampulse.com',
      phone: '8888888888',
      password: 'User@123',
      role: 'user',
      isVerified: true,
      studyStats: {
        totalStudyHours: 142,
        currentStreak: 15,
        longestStreak: 21,
        lastStudyDate: new Date(),
        completedTopics: 45,
      },
    });

    // Create exams with slugs
    console.log('📚 Creating exams...');
    // Add slug to each exam since insertMany doesn't trigger pre-save hooks
    const examsWithSlugs = exams.map(exam => ({
      ...exam,
      slug: exam.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    }));
    const createdExams = await Exam.insertMany(examsWithSlugs);

    // Create resources
    console.log('📖 Creating resources...');
    const resources = [
      {
        title: 'Complete Indian Polity Notes',
        description: 'Comprehensive notes covering Constitution, Parliament, Judiciary, and more.',
        type: 'notes',
        category: 'UPSC',
        subject: 'polity',
        tags: ['Constitution', 'Parliament', 'Judiciary'],
        thumbnail: '📚',
        pages: 120,
        uploadedBy: adminUser._id,
        uploaderName: 'Admin User',
        stats: { views: 25600, downloads: 12400, bookmarks: 3200 },
        rating: { average: 4.8, count: 156 },
        isFeatured: true,
        isTrending: true,
      },
      {
        title: 'SSC CGL Mathematics PYQ (2015-2024)',
        description: 'Last 10 years solved previous year questions with detailed explanations.',
        type: 'pyq',
        category: 'SSC',
        subject: 'math',
        tags: ['Quantitative', 'Algebra', 'Geometry'],
        thumbnail: '🔢',
        pages: 200,
        uploadedBy: adminUser._id,
        uploaderName: 'Admin User',
        stats: { views: 34200, downloads: 18900, bookmarks: 4500 },
        rating: { average: 4.9, count: 289 },
        isFeatured: true,
        isTrending: true,
      },
      {
        title: 'Banking Awareness Complete Package',
        description: 'Current affairs, banking terms, RBI policies, and financial awareness.',
        type: 'notes',
        category: 'Banking',
        subject: 'gk',
        tags: ['RBI', 'Banking Terms', 'Current Affairs'],
        thumbnail: '🏦',
        pages: 85,
        uploadedBy: adminUser._id,
        uploaderName: 'Admin User',
        stats: { views: 18500, downloads: 9800, bookmarks: 2100 },
        rating: { average: 4.7, count: 134 },
        isFeatured: true,
      },
      {
        title: 'English Grammar Masterclass',
        description: 'Complete video series covering grammar rules, vocabulary, and comprehension.',
        type: 'video',
        category: 'All Exams',
        subject: 'english',
        tags: ['Grammar', 'Vocabulary', 'Comprehension'],
        thumbnail: '🎥',
        duration: '12 hours',
        uploadedBy: adminUser._id,
        uploaderName: 'Admin User',
        stats: { views: 42000, downloads: 15600, bookmarks: 5600 },
        rating: { average: 4.9, count: 412 },
        isFeatured: true,
        isTrending: true,
      },
      {
        title: 'Indian Geography Complete Notes',
        description: 'Detailed notes on physical, economic, and social geography with maps.',
        type: 'notes',
        category: 'UPSC',
        subject: 'geography',
        tags: ['Physical', 'Economic', 'Maps'],
        thumbnail: '🗺️',
        pages: 95,
        uploadedBy: adminUser._id,
        uploaderName: 'Admin User',
        stats: { views: 16200, downloads: 8700, bookmarks: 1800 },
        rating: { average: 4.6, count: 98 },
        isFeatured: true,
      },
      {
        title: 'Reasoning Shortcuts & Tricks',
        description: 'Smart shortcuts for solving reasoning questions quickly.',
        type: 'notes',
        category: 'SSC',
        subject: 'reasoning',
        tags: ['Shortcuts', 'Puzzles', 'Seating'],
        thumbnail: '🧠',
        pages: 65,
        uploadedBy: adminUser._id,
        uploaderName: 'Admin User',
        stats: { views: 38900, downloads: 21000, bookmarks: 4800 },
        rating: { average: 4.8, count: 267 },
        isTrending: true,
      },
    ];

    // Add slug to each resource since insertMany doesn't trigger pre-save hooks
    const resourcesWithSlugs = resources.map(resource => ({
      ...resource,
      slug: resource.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
    }));
    await Resource.insertMany(resourcesWithSlugs);

    // Create notifications
    console.log('🔔 Creating notifications...');
    const notifications = [
      {
        title: 'SSC CGL 2025 Notification Released',
        message: 'Staff Selection Commission has released the CGL 2025 notification. Apply now!',
        type: 'exam-update',
        priority: 'high',
        exam: createdExams[0]._id,
        icon: '📋',
        color: '#E9460A',
      },
      {
        title: 'IBPS PO Mains Exam Date Announced',
        message: 'IBPS PO Mains examination scheduled for February 5, 2025.',
        type: 'exam-update',
        priority: 'medium',
        exam: createdExams[1]._id,
        icon: '📅',
        color: '#22C55E',
      },
      {
        title: 'RRB NTPC Admit Card Released',
        message: 'Download your admit card from the official RRB website.',
        type: 'admit-card',
        priority: 'high',
        exam: createdExams[2]._id,
        icon: '🎫',
        color: '#F97316',
      },
      {
        title: 'UPSC CSE 2025 - 1000+ Vacancies',
        message: 'UPSC announces 1000+ vacancies for Civil Services Examination 2025.',
        type: 'new-vacancy',
        priority: 'high',
        exam: createdExams[3]._id,
        icon: '🎯',
        color: '#8B5CF6',
      },
      {
        title: 'New Study Material Added',
        message: 'Indian Polity Complete Notes PDF now available in resources.',
        type: 'resource',
        priority: 'low',
        icon: '📚',
        color: '#99A57D',
      },
    ];

    await Notification.insertMany(notifications);

    console.log('✅ Database seeded successfully!');
    console.log('');
    console.log('📋 Created:');
    console.log(`   - ${2} users (admin@exampulse.com / Admin@123)`);
    console.log(`   - ${createdExams.length} exams`);
    console.log(`   - ${resources.length} resources`);
    console.log(`   - ${notifications.length} notifications`);
    console.log('');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

seedDatabase();

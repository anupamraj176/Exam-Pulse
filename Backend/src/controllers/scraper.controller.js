import axios from 'axios';
import * as cheerio from 'cheerio';
import Exam from '../models/Exam.model.js';
import Notification from '../models/Notification.model.js';
import { ApiError } from '../middleware/error.middleware.js';
import { emitToAll } from '../config/socket.js';

// Scraper configurations for different government exam websites
const SCRAPER_SOURCES = {
  sarkariResult: {
    name: 'Sarkari Result',
    baseUrl: 'https://www.sarkariresult.com',
    latestJobsPath: '/latestjob.php',
  },
  sscNic: {
    name: 'SSC Official',
    baseUrl: 'https://ssc.nic.in',
  },
  ibpsOnline: {
    name: 'IBPS Official',
    baseUrl: 'https://www.ibps.in',
  },
  upscGov: {
    name: 'UPSC Official',
    baseUrl: 'https://www.upsc.gov.in',
  },
  rrbOnline: {
    name: 'RRB Official',
    baseUrl: 'https://indianrailways.gov.in/railwayboard/view_section.jsp?lang=0&id=0,1,304',
  },
};

// Helper function to make requests with retry
const fetchWithRetry = async (url, retries = 3) => {
  for (let i = 0; i < retries; i++) {
    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8',
          'Accept-Language': 'en-US,en;q=0.5',
        },
        timeout: 10000,
      });
      return response.data;
    } catch (error) {
      if (i === retries - 1) throw error;
      await new Promise((r) => setTimeout(r, 1000 * (i + 1)));
    }
  }
};

// @desc    Scrape latest exam notifications
// @route   POST /api/scraper/notifications
// @access  Private/Admin
export const scrapeNotifications = async (req, res, next) => {
  try {
    const scrapedData = [];
    
    // This is a mock implementation - in production, you would scrape actual websites
    // For demo purposes, we'll create sample notifications
    
    const sampleNotifications = [
      {
        title: 'SSC CGL 2025 Notification Released',
        message: 'Staff Selection Commission has released the Combined Graduate Level Examination 2025 notification. Applications are now open.',
        type: 'exam-update',
        priority: 'high',
        icon: '📋',
        color: '#E9460A',
        externalLink: 'https://ssc.nic.in',
        scrapedFrom: {
          source: 'SSC Official',
          url: 'https://ssc.nic.in',
          originalDate: new Date(),
        },
      },
      {
        title: 'IBPS PO Prelims Result Declared',
        message: 'IBPS has declared the Probationary Officer Preliminary Examination result. Check your score now.',
        type: 'result',
        priority: 'high',
        icon: '📊',
        color: '#22C55E',
        externalLink: 'https://ibps.in',
        scrapedFrom: {
          source: 'IBPS Official',
          url: 'https://ibps.in',
          originalDate: new Date(),
        },
      },
      {
        title: 'RRB NTPC Admit Card Available',
        message: 'Railway Recruitment Board has released admit cards for NTPC CBT-1 examination.',
        type: 'admit-card',
        priority: 'medium',
        icon: '🎫',
        color: '#F97316',
        externalLink: 'https://indianrailways.gov.in',
        scrapedFrom: {
          source: 'RRB Official',
          url: 'https://indianrailways.gov.in',
          originalDate: new Date(),
        },
      },
      {
        title: 'UPSC CSE 2025 - 1000+ Vacancies',
        message: 'Union Public Service Commission announces 1000+ vacancies for Civil Services Examination 2025.',
        type: 'new-vacancy',
        priority: 'high',
        icon: '🎯',
        color: '#8B5CF6',
        externalLink: 'https://upsc.gov.in',
        scrapedFrom: {
          source: 'UPSC Official',
          url: 'https://upsc.gov.in',
          originalDate: new Date(),
        },
      },
      {
        title: 'SBI Clerk Application Deadline Extended',
        message: 'State Bank of India has extended the application deadline for Clerk recruitment. New last date: January 31, 2025.',
        type: 'deadline',
        priority: 'urgent',
        icon: '⏰',
        color: '#EF4444',
        externalLink: 'https://sbi.co.in',
        scrapedFrom: {
          source: 'SBI Official',
          url: 'https://sbi.co.in',
          originalDate: new Date(),
        },
      },
    ];

    // Check for existing notifications to avoid duplicates
    for (const notifData of sampleNotifications) {
      const existingNotif = await Notification.findOne({
        title: notifData.title,
        'scrapedFrom.source': notifData.scrapedFrom.source,
      });

      if (!existingNotif) {
        const notification = await Notification.create(notifData);
        scrapedData.push(notification);

        // Emit real-time notification
        emitToAll('notification:new', {
          id: notification._id,
          title: notification.title,
          message: notification.message,
          type: notification.type,
          icon: notification.icon,
          color: notification.color,
        });
      }
    }

    res.json({
      success: true,
      message: `Scraped ${scrapedData.length} new notifications`,
      data: { notifications: scrapedData },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Scrape exam details
// @route   POST /api/scraper/exams
// @access  Private/Admin
export const scrapeExams = async (req, res, next) => {
  try {
    // Sample exam data - in production, this would be scraped from official websites
    const sampleExams = [
      {
        name: 'SSC CGL 2025',
        fullName: 'Staff Selection Commission Combined Graduate Level Examination 2025',
        category: 'ssc',
        conductingBody: 'Staff Selection Commission',
        officialWebsite: 'https://ssc.nic.in',
        description: 'SSC CGL is a national level examination conducted for recruitment to various Group B and Group C posts in Government ministries and departments.',
        eligibility: {
          minAge: 18,
          maxAge: 32,
          qualification: 'Bachelor\'s Degree from a recognized University',
        },
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
        vacancies: {
          total: 7500,
          general: 3000,
          obc: 2000,
          sc: 1125,
          st: 562,
          ews: 813,
        },
        applicationFee: {
          general: 100,
          obc: 100,
          sc: 0,
          st: 0,
          female: 0,
        },
        status: 'application-open',
        icon: '📋',
        color: '#3B82F6',
        scrapedFrom: {
          source: 'SSC Official',
          url: 'https://ssc.nic.in',
          lastScraped: new Date(),
        },
      },
      {
        name: 'IBPS PO 2025',
        fullName: 'Institute of Banking Personnel Selection Probationary Officer Examination 2025',
        category: 'banking',
        conductingBody: 'Institute of Banking Personnel Selection',
        officialWebsite: 'https://www.ibps.in',
        description: 'IBPS PO examination is conducted for recruitment of Probationary Officers in various Public Sector Banks across India.',
        eligibility: {
          minAge: 20,
          maxAge: 30,
          qualification: 'Bachelor\'s Degree from a recognized University',
        },
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
        vacancies: {
          total: 4500,
          general: 1800,
          obc: 1200,
          sc: 675,
          st: 337,
          ews: 488,
        },
        applicationFee: {
          general: 850,
          obc: 850,
          sc: 175,
          st: 175,
          female: 175,
        },
        status: 'upcoming',
        icon: '🏦',
        color: '#22C55E',
        scrapedFrom: {
          source: 'IBPS Official',
          url: 'https://www.ibps.in',
          lastScraped: new Date(),
        },
      },
      {
        name: 'RRB NTPC 2025',
        fullName: 'Railway Recruitment Board Non-Technical Popular Categories 2025',
        category: 'railways',
        conductingBody: 'Railway Recruitment Board',
        officialWebsite: 'https://indianrailways.gov.in',
        description: 'RRB NTPC exam is conducted for recruitment to various non-technical posts in Indian Railways.',
        eligibility: {
          minAge: 18,
          maxAge: 33,
          qualification: '12th pass / Graduate depending on post',
        },
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
        vacancies: {
          total: 35000,
          general: 14000,
          obc: 9450,
          sc: 5250,
          st: 2625,
          ews: 3675,
        },
        applicationFee: {
          general: 500,
          obc: 500,
          sc: 250,
          st: 250,
          female: 250,
        },
        status: 'upcoming',
        icon: '🚂',
        color: '#EF4444',
        scrapedFrom: {
          source: 'RRB Official',
          url: 'https://indianrailways.gov.in',
          lastScraped: new Date(),
        },
      },
      {
        name: 'UPSC CSE 2025',
        fullName: 'Union Public Service Commission Civil Services Examination 2025',
        category: 'upsc',
        conductingBody: 'Union Public Service Commission',
        officialWebsite: 'https://www.upsc.gov.in',
        description: 'UPSC CSE is conducted for recruitment to various Civil Services of the Government of India including IAS, IPS, IFS, etc.',
        eligibility: {
          minAge: 21,
          maxAge: 32,
          qualification: 'Bachelor\'s Degree from a recognized University',
        },
        examPattern: {
          totalMarks: 200,
          duration: '120 minutes',
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
        vacancies: {
          total: 1000,
          general: 400,
          obc: 270,
          sc: 150,
          st: 75,
          ews: 105,
        },
        applicationFee: {
          general: 100,
          obc: 100,
          sc: 0,
          st: 0,
          female: 0,
        },
        status: 'upcoming',
        icon: '🎯',
        color: '#8B5CF6',
        scrapedFrom: {
          source: 'UPSC Official',
          url: 'https://www.upsc.gov.in',
          lastScraped: new Date(),
        },
      },
    ];

    const scrapedExams = [];

    for (const examData of sampleExams) {
      // Check if exam already exists
      const existingExam = await Exam.findOne({
        name: examData.name,
        year: new Date().getFullYear(),
      });

      if (existingExam) {
        // Update existing exam
        Object.assign(existingExam, examData);
        await existingExam.save();
        scrapedExams.push(existingExam);
      } else {
        // Create new exam
        const exam = await Exam.create(examData);
        scrapedExams.push(exam);

        // Create notification for new exam
        await Notification.create({
          title: `New Exam Added: ${exam.name}`,
          message: `${exam.fullName} has been added. Check important dates and apply now!`,
          type: 'exam-update',
          priority: 'medium',
          exam: exam._id,
          icon: exam.icon,
          color: exam.color,
        });
      }
    }

    res.json({
      success: true,
      message: `Processed ${scrapedExams.length} exams`,
      data: { exams: scrapedExams },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get scraper status
// @route   GET /api/scraper/status
// @access  Private/Admin
export const getScraperStatus = async (req, res, next) => {
  try {
    const lastScrapedNotification = await Notification.findOne({
      'scrapedFrom.source': { $exists: true },
    }).sort({ 'scrapedFrom.lastScraped': -1 });

    const lastScrapedExam = await Exam.findOne({
      'scrapedFrom.source': { $exists: true },
    }).sort({ 'scrapedFrom.lastScraped': -1 });

    const totalScrapedNotifications = await Notification.countDocuments({
      'scrapedFrom.source': { $exists: true },
    });

    const totalScrapedExams = await Exam.countDocuments({
      'scrapedFrom.source': { $exists: true },
    });

    res.json({
      success: true,
      data: {
        notifications: {
          lastScraped: lastScrapedNotification?.scrapedFrom?.lastScraped || null,
          total: totalScrapedNotifications,
        },
        exams: {
          lastScraped: lastScrapedExam?.scrapedFrom?.lastScraped || null,
          total: totalScrapedExams,
        },
        sources: Object.keys(SCRAPER_SOURCES).map((key) => ({
          id: key,
          ...SCRAPER_SOURCES[key],
        })),
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Trigger manual scrape
// @route   POST /api/scraper/run
// @access  Private/Admin
export const runScraper = async (req, res, next) => {
  try {
    const { type = 'all' } = req.body;

    const results = {
      notifications: null,
      exams: null,
    };

    if (type === 'all' || type === 'notifications') {
      // Mock scraping - in production, call actual scraper
      const notifResponse = await scrapeNotifications(
        { body: {} },
        {
          json: (data) => {
            results.notifications = data;
          },
        },
        (err) => {
          if (err) throw err;
        }
      );
    }

    if (type === 'all' || type === 'exams') {
      const examResponse = await scrapeExams(
        { body: {} },
        {
          json: (data) => {
            results.exams = data;
          },
        },
        (err) => {
          if (err) throw err;
        }
      );
    }

    res.json({
      success: true,
      message: 'Scraper run completed',
      data: results,
    });
  } catch (error) {
    next(error);
  }
};

export default {
  scrapeNotifications,
  scrapeExams,
  getScraperStatus,
  runScraper,
};

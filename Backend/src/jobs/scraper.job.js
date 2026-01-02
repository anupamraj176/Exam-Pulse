import cron from 'node-cron';
import Exam from '../models/Exam.model.js';
import Notification from '../models/Notification.model.js';
import { emitToAll } from '../config/socket.js';

// Run scraper every 6 hours
cron.schedule('0 */6 * * *', async () => {
  console.log('🔄 Running scheduled scraper job...');
  
  try {
    // In production, this would call actual scraping functions
    // For now, we'll just log the action
    console.log('📰 Checking for new exam notifications...');
    
    // You could import and call your scraper functions here
    // await scrapeNotifications();
    // await scrapeExams();
    
    console.log('✅ Scraper job completed');
  } catch (error) {
    console.error('❌ Scraper job failed:', error);
  }
});

// Update exam statuses daily at midnight
cron.schedule('0 0 * * *', async () => {
  console.log('🔄 Updating exam statuses...');
  
  try {
    const today = new Date();
    
    // Update exams with passed application deadlines
    await Exam.updateMany(
      {
        status: 'application-open',
        'importantDates.applicationEndDate': { $lt: today },
      },
      { status: 'application-closed' }
    );
    
    // Update exams with passed exam dates
    await Exam.updateMany(
      {
        status: { $in: ['application-closed', 'upcoming'] },
        'importantDates.examDate': { $lt: today },
      },
      { status: 'completed' }
    );
    
    // Find exams with deadlines in next 3 days and create notifications
    const threeDaysFromNow = new Date();
    threeDaysFromNow.setDate(threeDaysFromNow.getDate() + 3);
    
    const urgentExams = await Exam.find({
      'importantDates.applicationEndDate': {
        $gte: today,
        $lte: threeDaysFromNow,
      },
      status: 'application-open',
    });
    
    for (const exam of urgentExams) {
      const daysLeft = Math.ceil(
        (exam.importantDates.applicationEndDate - today) / (1000 * 60 * 60 * 24)
      );
      
      // Check if we already created this notification
      const existingNotif = await Notification.findOne({
        exam: exam._id,
        type: 'deadline',
        createdAt: { $gte: new Date(today.setHours(0, 0, 0, 0)) },
      });
      
      if (!existingNotif) {
        const notification = await Notification.create({
          title: `${exam.name} Application Deadline`,
          message: `Only ${daysLeft} day(s) left to apply for ${exam.fullName}. Apply now!`,
          type: 'deadline',
          priority: 'urgent',
          exam: exam._id,
          icon: '⏰',
          color: '#EF4444',
          targetExams: [exam._id],
        });
        
        // Emit real-time notification
        emitToAll('notification:deadline', {
          id: notification._id,
          title: notification.title,
          message: notification.message,
          examId: exam._id,
        });
      }
    }
    
    console.log('✅ Exam status update completed');
  } catch (error) {
    console.error('❌ Exam status update failed:', error);
  }
});

// Clean up old notifications weekly (Sunday at 3 AM)
cron.schedule('0 3 * * 0', async () => {
  console.log('🧹 Cleaning up old notifications...');
  
  try {
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    
    const result = await Notification.deleteMany({
      createdAt: { $lt: thirtyDaysAgo },
      type: { $nin: ['exam-update', 'result'] }, // Keep important notifications
    });
    
    console.log(`✅ Cleaned up ${result.deletedCount} old notifications`);
  } catch (error) {
    console.error('❌ Notification cleanup failed:', error);
  }
});

console.log('📅 Cron jobs scheduled:');
console.log('  - Scraper: Every 6 hours');
console.log('  - Exam status update: Daily at midnight');
console.log('  - Notification cleanup: Weekly on Sunday at 3 AM');

export default cron;

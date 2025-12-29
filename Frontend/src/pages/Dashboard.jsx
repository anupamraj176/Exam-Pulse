import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  User,
  BookOpen,
  Target,
  Calendar,
  TrendingUp,
  Clock,
  Award,
  Bookmark,
  Download,
  Eye,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  Flame,
  Star,
  FileText,
  Video,
  Edit,
  Settings,
  LogOut
} from 'lucide-react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  // Color palette
  const colors = {
    smokyBlack: '#100C0B',
    eerieLight: '#282723',
    eerieBlack: '#1C1B17',
    night: '#171614',
    moss: '#99A57D',
    hotOrange: '#E9460A',
    orangeWheel: '#F77E0D',
    pureWhite: '#FFFFFF',
  };

  // Mock user data
  const userData = {
    name: 'Arjun Sharma',
    email: 'arjun.sharma@email.com',
    targetExam: 'SSC CGL 2025',
    examDate: '2025-08-15',
    joinedDate: '2024-06-15',
    studyStreak: 15,
    totalStudyHours: 142,
    avatar: 'AS',
  };

  // Stats data
  const stats = [
    {
      label: 'Study Streak',
      value: userData.studyStreak,
      unit: 'days',
      icon: Flame,
      color: colors.hotOrange,
      bgColor: `${colors.hotOrange}20`,
      trend: '+3 from last week',
    },
    {
      label: 'Total Study Hours',
      value: userData.totalStudyHours,
      unit: 'hrs',
      icon: Clock,
      color: colors.orangeWheel,
      bgColor: `${colors.orangeWheel}20`,
      trend: '+12 this week',
    },
    {
      label: 'Completed Topics',
      value: 45,
      unit: 'topics',
      icon: CheckCircle,
      color: colors.moss,
      bgColor: `${colors.moss}20`,
      trend: '78% progress',
    },
    {
      label: 'Bookmarked Items',
      value: 23,
      unit: 'items',
      icon: Bookmark,
      color: colors.hotOrange,
      bgColor: `${colors.hotOrange}20`,
      trend: '5 this week',
    },
  ];

  // Recent activity
  const recentActivity = [
    {
      id: 1,
      type: 'download',
      title: 'Indian Polity Notes',
      action: 'Downloaded',
      time: '2 hours ago',
      icon: Download,
    },
    {
      id: 2,
      type: 'complete',
      title: 'Mathematics Chapter 5',
      action: 'Completed',
      time: '5 hours ago',
      icon: CheckCircle,
    },
    {
      id: 3,
      type: 'bookmark',
      title: 'English Grammar Guide',
      action: 'Bookmarked',
      time: '1 day ago',
      icon: Bookmark,
    },
    {
      id: 4,
      type: 'view',
      title: 'Reasoning PYQ 2023',
      action: 'Viewed',
      time: '2 days ago',
      icon: Eye,
    },
  ];

  // Bookmarked resources
  const bookmarkedResources = [
    {
      id: 1,
      title: 'Complete Indian Polity Notes',
      category: 'UPSC',
      type: 'notes',
      thumbnail: '📚',
      progress: 65,
    },
    {
      id: 2,
      title: 'SSC CGL Mathematics PYQ',
      category: 'SSC',
      type: 'pyq',
      thumbnail: '🔢',
      progress: 45,
    },
    {
      id: 3,
      title: 'English Grammar Masterclass',
      category: 'All Exams',
      type: 'video',
      thumbnail: '🎥',
      progress: 80,
    },
  ];

  // Upcoming exams
  const upcomingExams = [
    {
      name: 'SSC CGL Tier 1',
      date: '2025-08-15',
      daysLeft: 230,
      status: 'upcoming',
    },
    {
      name: 'SSC CHSL',
      date: '2025-09-20',
      daysLeft: 266,
      status: 'upcoming',
    },
    {
      name: 'IBPS PO Prelims',
      date: '2025-10-05',
      daysLeft: 281,
      status: 'upcoming',
    },
  ];

  // Study goals
  const studyGoals = [
    {
      subject: 'Mathematics',
      current: 45,
      target: 60,
      unit: 'topics',
    },
    {
      subject: 'Reasoning',
      current: 32,
      target: 40,
      unit: 'topics',
    },
    {
      subject: 'English',
      current: 28,
      target: 35,
      unit: 'topics',
    },
    {
      subject: 'General Knowledge',
      current: 55,
      target: 70,
      unit: 'topics',
    },
  ];

  const tabs = [
    { id: 'overview', name: 'Overview', icon: Target },
    { id: 'bookmarks', name: 'Bookmarks', icon: Bookmark },
    { id: 'progress', name: 'Progress', icon: TrendingUp },
    { id: 'exams', name: 'Exams', icon: Calendar },
  ];

  return (
    <div 
      style={{ backgroundColor: colors.smokyBlack }}
      className="min-h-screen pt-20"
    >
      {/* Dashboard Header */}
      <div 
        style={{ 
          background: `linear-gradient(135deg, ${colors.night} 0%, ${colors.eerieBlack} 100%)`,
          borderBottom: `2px solid ${colors.hotOrange}`,
        }}
        className="py-8 relative overflow-hidden"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div 
            style={{
              background: `radial-gradient(circle at 30% 50%, ${colors.hotOrange}10 0%, transparent 50%)`,
            }}
            className="absolute top-0 left-0 w-96 h-96 blur-3xl"
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div 
                style={{
                  background: `linear-gradient(to bottom right, ${colors.hotOrange}, ${colors.orangeWheel})`,
                }}
                className="w-16 h-16 rounded-full flex items-center justify-center text-white text-2xl font-bold"
              >
                {userData.avatar}
              </div>
              <div>
                <h1 
                  style={{ color: colors.pureWhite }}
                  className="text-2xl lg:text-3xl font-display font-bold"
                >
                  Welcome back, {userData.name.split(' ')[0]}! 👋
                </h1>
                <p 
                  style={{ color: colors.moss }}
                  className="text-sm"
                >
                  Keep up the great work! You're on a {userData.studyStreak} day streak 🔥
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                style={{
                  backgroundColor: colors.eerieBlack,
                  borderColor: `${colors.moss}30`,
                  color: colors.moss,
                }}
                className="p-3 rounded-lg border-2 transition-all duration-200"
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = colors.hotOrange;
                  e.currentTarget.style.color = colors.hotOrange;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `${colors.moss}30`;
                  e.currentTarget.style.color = colors.moss;
                }}
              >
                <Settings className="h-5 w-5" />
              </button>
              <button
                style={{
                  backgroundColor: colors.eerieBlack,
                  borderColor: `${colors.moss}30`,
                  color: colors.moss,
                }}
                className="p-3 rounded-lg border-2 transition-all duration-200"
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = colors.hotOrange;
                  e.currentTarget.style.color = colors.hotOrange;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `${colors.moss}30`;
                  e.currentTarget.style.color = colors.moss;
                }}
              >
                <Edit className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div
                key={index}
                style={{
                  backgroundColor: colors.eerieBlack,
                  borderColor: `${colors.moss}20`,
                }}
                className="rounded-2xl border-2 p-6 transition-all duration-300 hover:shadow-xl"
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = stat.color;
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `${colors.moss}20`;
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <div className="flex items-start justify-between mb-4">
                  <div 
                    style={{ backgroundColor: stat.bgColor }}
                    className="p-3 rounded-xl"
                  >
                    <Icon style={{ color: stat.color }} className="h-6 w-6" />
                  </div>
                  <span 
                    style={{ color: colors.moss }}
                    className="text-xs"
                  >
                    {stat.trend}
                  </span>
                </div>
                <h3 
                  style={{ color: colors.pureWhite }}
                  className="text-3xl font-bold mb-1"
                >
                  {stat.value}<span className="text-xl ml-1">{stat.unit}</span>
                </h3>
                <p 
                  style={{ color: colors.moss }}
                  className="text-sm"
                >
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="flex items-center space-x-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  backgroundColor: activeTab === tab.id ? colors.eerieBlack : 'transparent',
                  borderColor: activeTab === tab.id ? colors.hotOrange : `${colors.moss}30`,
                  color: activeTab === tab.id ? colors.hotOrange : colors.moss,
                  background: activeTab === tab.id 
                    ? `linear-gradient(to right, ${colors.hotOrange}20, ${colors.orangeWheel}20)` 
                    : 'transparent',
                }}
                className="flex items-center space-x-2 px-6 py-3 rounded-lg border-2 font-medium whitespace-nowrap transition-all duration-200"
              >
                <Icon className="h-4 w-4" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Content - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            
            {activeTab === 'overview' && (
              <>
                {/* Study Goals */}
                <div
                  style={{
                    backgroundColor: colors.eerieBlack,
                    borderColor: `${colors.moss}20`,
                  }}
                  className="rounded-2xl border-2 p-6"
                >
                  <div className="flex items-center justify-between mb-6">
                    <h2 
                      style={{ color: colors.pureWhite }}
                      className="text-xl font-bold flex items-center space-x-2"
                    >
                      <Target style={{ color: colors.hotOrange }} className="h-6 w-6" />
                      <span>Study Goals</span>
                    </h2>
                    <Link
                      to="/goals"
                      style={{ color: colors.moss }}
                      className="text-sm hover:text-hotOrange transition-colors"
                    >
                      View All
                    </Link>
                  </div>

                  <div className="space-y-4">
                    {studyGoals.map((goal, index) => (
                      <div key={index}>
                        <div className="flex items-center justify-between mb-2">
                          <span 
                            style={{ color: colors.pureWhite }}
                            className="text-sm font-medium"
                          >
                            {goal.subject}
                          </span>
                          <span 
                            style={{ color: colors.moss }}
                            className="text-sm"
                          >
                            {goal.current}/{goal.target} {goal.unit}
                          </span>
                        </div>
                        <div 
                          style={{ backgroundColor: colors.smokyBlack }}
                          className="h-3 rounded-full overflow-hidden"
                        >
                          <div
                            style={{
                              width: `${(goal.current / goal.target) * 100}%`,
                              background: `linear-gradient(to right, ${colors.hotOrange}, ${colors.orangeWheel})`,
                            }}
                            className="h-full rounded-full transition-all duration-500"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recent Activity */}
                <div
                  style={{
                    backgroundColor: colors.eerieBlack,
                    borderColor: `${colors.moss}20`,
                  }}
                  className="rounded-2xl border-2 p-6"
                >
                  <h2 
                    style={{ color: colors.pureWhite }}
                    className="text-xl font-bold mb-6 flex items-center space-x-2"
                  >
                    <Clock style={{ color: colors.hotOrange }} className="h-6 w-6" />
                    <span>Recent Activity</span>
                  </h2>

                  <div className="space-y-4">
                    {recentActivity.map((activity) => {
                      const Icon = activity.icon;
                      return (
                        <div 
                          key={activity.id}
                          className="flex items-center space-x-4"
                        >
                          <div 
                            style={{ backgroundColor: `${colors.hotOrange}20` }}
                            className="p-2 rounded-lg"
                          >
                            <Icon style={{ color: colors.hotOrange }} className="h-5 w-5" />
                          </div>
                          <div className="flex-1">
                            <p 
                              style={{ color: colors.pureWhite }}
                              className="text-sm font-medium"
                            >
                              {activity.title}
                            </p>
                            <p 
                              style={{ color: colors.moss }}
                              className="text-xs"
                            >
                              {activity.action} • {activity.time}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </>
            )}

            {activeTab === 'bookmarks' && (
              <div
                style={{
                  backgroundColor: colors.eerieBlack,
                  borderColor: `${colors.moss}20`,
                }}
                className="rounded-2xl border-2 p-6"
              >
                <h2 
                  style={{ color: colors.pureWhite }}
                  className="text-xl font-bold mb-6 flex items-center space-x-2"
                >
                  <Bookmark style={{ color: colors.hotOrange }} className="h-6 w-6" />
                  <span>Bookmarked Resources</span>
                </h2>

                <div className="space-y-4">
                  {bookmarkedResources.map((resource) => (
                    <div
                      key={resource.id}
                      style={{
                        backgroundColor: colors.smokyBlack,
                        borderColor: `${colors.moss}20`,
                      }}
                      className="rounded-xl border p-4 transition-all duration-300 hover:border-hotOrange"
                    >
                      <div className="flex items-start space-x-4 mb-4">
                        <div className="text-3xl">{resource.thumbnail}</div>
                        <div className="flex-1">
                          <h3 
                            style={{ color: colors.pureWhite }}
                            className="font-semibold mb-1"
                          >
                            {resource.title}
                          </h3>
                          <div className="flex items-center space-x-2">
                            <span
                              style={{
                                backgroundColor: `${colors.moss}20`,
                                color: colors.moss,
                              }}
                              className="px-2 py-0.5 rounded text-xs"
                            >
                              {resource.category}
                            </span>
                            <span
                              style={{ color: colors.moss }}
                              className="text-xs"
                            >
                              {resource.type}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span 
                            style={{ color: colors.moss }}
                            className="text-xs"
                          >
                            Progress
                          </span>
                          <span 
                            style={{ color: colors.pureWhite }}
                            className="text-xs font-semibold"
                          >
                            {resource.progress}%
                          </span>
                        </div>
                        <div 
                          style={{ backgroundColor: colors.night }}
                          className="h-2 rounded-full overflow-hidden"
                        >
                          <div
                            style={{
                              width: `${resource.progress}%`,
                              background: `linear-gradient(to right, ${colors.hotOrange}, ${colors.orangeWheel})`,
                            }}
                            className="h-full rounded-full"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'progress' && (
              <div
                style={{
                  backgroundColor: colors.eerieBlack,
                  borderColor: `${colors.moss}20`,
                }}
                className="rounded-2xl border-2 p-6"
              >
                <h2 
                  style={{ color: colors.pureWhite }}
                  className="text-xl font-bold mb-6 flex items-center space-x-2"
                >
                  <TrendingUp style={{ color: colors.hotOrange }} className="h-6 w-6" />
                  <span>Learning Progress</span>
                </h2>

                <div className="text-center py-12">
                  <TrendingUp 
                    style={{ color: colors.moss }}
                    className="h-16 w-16 mx-auto mb-4 opacity-50"
                  />
                  <p 
                    style={{ color: colors.moss }}
                    className="text-lg"
                  >
                    Detailed progress analytics coming soon!
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'exams' && (
              <div
                style={{
                  backgroundColor: colors.eerieBlack,
                  borderColor: `${colors.moss}20`,
                }}
                className="rounded-2xl border-2 p-6"
              >
                <h2 
                  style={{ color: colors.pureWhite }}
                  className="text-xl font-bold mb-6 flex items-center space-x-2"
                >
                  <Calendar style={{ color: colors.hotOrange }} className="h-6 w-6" />
                  <span>Exam Calendar</span>
                </h2>

                <div className="space-y-4">
                  {upcomingExams.map((exam, index) => (
                    <div
                      key={index}
                      style={{
                        backgroundColor: colors.smokyBlack,
                        borderColor: `${colors.moss}20`,
                      }}
                      className="rounded-xl border p-4 transition-all duration-300 hover:border-hotOrange"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 
                            style={{ color: colors.pureWhite }}
                            className="font-semibold mb-1"
                          >
                            {exam.name}
                          </h3>
                          <p 
                            style={{ color: colors.moss }}
                            className="text-sm"
                          >
                            {new Date(exam.date).toLocaleDateString('en-US', { 
                              year: 'numeric', 
                              month: 'long', 
                              day: 'numeric' 
                            })}
                          </p>
                        </div>
                        <div className="text-right">
                          <p 
                            style={{ color: colors.hotOrange }}
                            className="text-2xl font-bold"
                          >
                            {exam.daysLeft}
                          </p>
                          <p 
                            style={{ color: colors.moss }}
                            className="text-xs"
                          >
                            days left
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - 1/3 width */}
          <div className="space-y-6">
            
            {/* Target Exam Card */}
            <div
              style={{
                backgroundColor: colors.eerieBlack,
                borderColor: colors.hotOrange,
              }}
              className="rounded-2xl border-2 p-6"
            >
              <h3 
                style={{ color: colors.pureWhite }}
                className="text-lg font-bold mb-4 flex items-center space-x-2"
              >
                <Target style={{ color: colors.hotOrange }} className="h-5 w-5" />
                <span>Target Exam</span>
              </h3>
              
              <div 
                style={{
                  background: `linear-gradient(135deg, ${colors.hotOrange}20, ${colors.orangeWheel}20)`,
                }}
                className="rounded-xl p-4 mb-4"
              >
                <p 
                  style={{ color: colors.pureWhite }}
                  className="text-xl font-bold mb-2"
                >
                  {userData.targetExam}
                </p>
                <div className="flex items-center space-x-2 mb-3">
                  <Calendar style={{ color: colors.moss }} className="h-4 w-4" />
                  <span 
                    style={{ color: colors.moss }}
                    className="text-sm"
                  >
                    {new Date(userData.examDate).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span 
                    style={{ color: colors.moss }}
                    className="text-sm"
                  >
                    Days Remaining
                  </span>
                  <span 
                    style={{ color: colors.hotOrange }}
                    className="text-2xl font-bold"
                  >
                    230
                  </span>
                </div>
              </div>

              <button
                style={{
                  background: `linear-gradient(to right, ${colors.hotOrange}, ${colors.orangeWheel})`,
                  color: colors.pureWhite,
                }}
                className="w-full py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all duration-200"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <span>View Exam Details</span>
                <ArrowRight className="h-5 w-5" />
              </button>
            </div>

            {/* Quick Links */}
            <div
              style={{
                backgroundColor: colors.eerieBlack,
                borderColor: `${colors.moss}20`,
              }}
              className="rounded-2xl border-2 p-6"
            >
              <h3 
                style={{ color: colors.pureWhite }}
                className="text-lg font-bold mb-4"
              >
                Quick Links
              </h3>

              <div className="space-y-3">
                <Link
                  to="/resources"
                  style={{
                    backgroundColor: colors.smokyBlack,
                    color: colors.pureWhite,
                  }}
                  className="flex items-center justify-between p-3 rounded-lg transition-all duration-200 hover:bg-opacity-80"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = colors.hotOrange;
                  }}
                >
                  <div className="flex items-center space-x-3">
                    <BookOpen style={{ color: colors.hotOrange }} className="h-5 w-5" />
                    <span className="text-sm font-medium">Browse Resources</span>
                  </div>
                  <ArrowRight style={{ color: colors.moss }} className="h-4 w-4" />
                </Link>

                <Link
                  to="/pyq"
                  style={{
                    backgroundColor: colors.smokyBlack,
                    color: colors.pureWhite,
                  }}
                  className="flex items-center justify-between p-3 rounded-lg transition-all duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <FileText style={{ color: colors.orangeWheel }} className="h-5 w-5" />
                    <span className="text-sm font-medium">Practice PYQs</span>
                  </div>
                  <ArrowRight style={{ color: colors.moss }} className="h-4 w-4" />
                </Link>

                <Link
                  to="/study-rooms"
                  style={{
                    backgroundColor: colors.smokyBlack,
                    color: colors.pureWhite,
                  }}
                  className="flex items-center justify-between p-3 rounded-lg transition-all duration-200"
                >
                  <div className="flex items-center space-x-3">
                    <Video style={{ color: colors.moss }} className="h-5 w-5" />
                    <span className="text-sm font-medium">Join Study Room</span>
                  </div>
                  <ArrowRight style={{ color: colors.moss }} className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

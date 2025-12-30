import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Bell,
  Calendar,
  FileText,
  Award,
  AlertCircle,
  CheckCircle,
  BookOpen,
  Users,
  TrendingUp,
  Filter,
  Check,
  Trash2,
  ExternalLink,
  Clock,
  Settings
} from 'lucide-react';

const Notifications = () => {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'exam',
      title: 'SSC CGL 2025 Notification Released',
      message: 'The Staff Selection Commission has released the official notification for SSC CGL 2025. Last date to apply: February 20, 2025.',
      time: '2 hours ago',
      date: '2025-01-15T10:30:00',
      isRead: false,
      icon: Calendar,
      color: '#E9460A',
      link: '/exams/ssc-cgl',
      priority: 'high',
    },
    {
      id: 2,
      type: 'result',
      title: 'IBPS PO Mains Result Declared',
      message: 'The results for IBPS PO Mains examination are now available. Check your result on the official website.',
      time: '5 hours ago',
      date: '2025-01-15T07:00:00',
      isRead: false,
      icon: Award,
      color: '#F77E0D',
      link: '/results/ibps-po',
      priority: 'high',
    },
    {
      id: 3,
      type: 'resource',
      title: 'New Study Material Added',
      message: 'Complete Indian Polity Notes for UPSC CSE 2025 has been uploaded. 120 pages of comprehensive content.',
      time: '1 day ago',
      date: '2025-01-14T15:20:00',
      isRead: false,
      icon: BookOpen,
      color: '#99A57D',
      link: '/resources',
      priority: 'medium',
    },
    {
      id: 4,
      type: 'achievement',
      title: '15 Day Study Streak! 🔥',
      message: 'Congratulations! You have maintained a 15-day study streak. Keep up the excellent work!',
      time: '1 day ago',
      date: '2025-01-14T09:00:00',
      isRead: true,
      icon: TrendingUp,
      color: '#99A57D',
      link: '/dashboard',
      priority: 'low',
    },
    {
      id: 5,
      type: 'exam',
      title: 'RRB NTPC Application Deadline Extended',
      message: 'Railway Recruitment Board has extended the application deadline for RRB NTPC to January 31, 2025.',
      time: '2 days ago',
      date: '2025-01-13T11:15:00',
      isRead: true,
      icon: AlertCircle,
      color: '#F77E0D',
      link: '/exams/rrb-ntpc',
      priority: 'medium',
    },
    {
      id: 6,
      type: 'community',
      title: 'New Study Room Created',
      message: 'A new study room "SSC CGL 2025 Mock Test Discussion" has been created. Join now to collaborate with peers.',
      time: '2 days ago',
      date: '2025-01-13T08:30:00',
      isRead: true,
      icon: Users,
      color: '#99A57D',
      link: '/study-rooms',
      priority: 'low',
    },
    {
      id: 7,
      type: 'exam',
      title: 'SBI Clerk Admit Card Available',
      message: 'State Bank of India has released admit cards for SBI Clerk Prelims 2025. Download now.',
      time: '3 days ago',
      date: '2025-01-12T14:00:00',
      isRead: true,
      icon: FileText,
      color: '#E9460A',
      link: '/admit-cards',
      priority: 'high',
    },
    {
      id: 8,
      type: 'resource',
      title: 'PYQ Updated',
      message: 'SSC CGL 2024 Previous Year Questions with solutions have been added to the library.',
      time: '4 days ago',
      date: '2025-01-11T16:45:00',
      isRead: true,
      icon: CheckCircle,
      color: '#99A57D',
      link: '/pyq',
      priority: 'medium',
    },
  ]);

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

  const filters = [
    { id: 'all', name: 'All', count: notifications.length },
    { id: 'unread', name: 'Unread', count: notifications.filter(n => !n.isRead).length },
    { id: 'exam', name: 'Exams', count: notifications.filter(n => n.type === 'exam').length },
    { id: 'result', name: 'Results', count: notifications.filter(n => n.type === 'result').length },
    { id: 'resource', name: 'Resources', count: notifications.filter(n => n.type === 'resource').length },
  ];

  const filteredNotifications = notifications.filter(notification => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'unread') return !notification.isRead;
    return notification.type === selectedFilter;
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAsRead = (id) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id 
          ? { ...notification, isRead: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => 
      prev.map(notification => ({ ...notification, isRead: true }))
    );
  };

  const deleteNotification = (id) => {
    setNotifications(prev => prev.filter(notification => notification.id !== id));
  };

  const getPriorityBadge = (priority) => {
    const badges = {
      high: { label: 'Urgent', color: colors.hotOrange },
      medium: { label: 'Important', color: colors.orangeWheel },
      low: { label: 'Info', color: colors.moss },
    };
    return badges[priority];
  };

  return (
    <div 
      style={{ backgroundColor: colors.smokyBlack }}
      className="min-h-screen pt-20"
    >
      {/* Page Header */}
      <div 
        style={{ 
          background: `linear-gradient(135deg, ${colors.night} 0%, ${colors.eerieBlack} 100%)`,
          borderBottom: `2px solid ${colors.hotOrange}`,
        }}
        className="py-12 relative overflow-hidden"
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
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <Bell style={{ color: colors.hotOrange }} className="h-6 w-6" />
                <span 
                  style={{ color: colors.moss }}
                  className="text-sm font-semibold uppercase tracking-wider"
                >
                  Notifications Center
                </span>
              </div>
              <h1 
                style={{ color: colors.pureWhite }}
                className="text-4xl lg:text-5xl font-display font-bold mb-2"
              >
                Stay Updated
              </h1>
              <p 
                style={{ color: colors.moss }}
                className="text-lg"
              >
                Never miss important exam notifications and updates
              </p>
            </div>

            <div className="flex items-center space-x-3">
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  style={{
                    backgroundColor: colors.eerieBlack,
                    borderColor: `${colors.moss}30`,
                    color: colors.moss,
                  }}
                  className="px-4 py-2 rounded-lg border-2 text-sm font-semibold flex items-center space-x-2 transition-all duration-200 hover:border-hotOrange hover:text-hotOrange"
                >
                  <Check className="h-4 w-4" />
                  <span>Mark All Read</span>
                </button>
              )}
              
              <button
                style={{
                  backgroundColor: colors.eerieBlack,
                  borderColor: `${colors.moss}30`,
                  color: colors.moss,
                }}
                className="p-2 rounded-lg border-2 transition-all duration-200 hover:border-hotOrange hover:text-hotOrange"
              >
                <Settings className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div
            style={{
              backgroundColor: colors.eerieBlack,
              borderColor: `${colors.hotOrange}30`,
            }}
            className="rounded-2xl border-2 p-6"
          >
            <div className="flex items-center justify-between mb-3">
              <div 
                style={{ backgroundColor: `${colors.hotOrange}20` }}
                className="p-3 rounded-xl"
              >
                <Bell style={{ color: colors.hotOrange }} className="h-6 w-6" />
              </div>
              {unreadCount > 0 && (
                <span
                  style={{
                    background: `linear-gradient(to right, ${colors.hotOrange}, ${colors.orangeWheel})`,
                    color: colors.pureWhite,
                  }}
                  className="px-3 py-1 rounded-full text-xs font-bold"
                >
                  {unreadCount} New
                </span>
              )}
            </div>
            <h3 
              style={{ color: colors.pureWhite }}
              className="text-2xl font-bold mb-1"
            >
              {unreadCount}
            </h3>
            <p 
              style={{ color: colors.moss }}
              className="text-sm"
            >
              Unread Notifications
            </p>
          </div>

          <div
            style={{
              backgroundColor: colors.eerieBlack,
              borderColor: `${colors.moss}20`,
            }}
            className="rounded-2xl border-2 p-6"
          >
            <div className="flex items-center justify-between mb-3">
              <div 
                style={{ backgroundColor: `${colors.orangeWheel}20` }}
                className="p-3 rounded-xl"
              >
                <Calendar style={{ color: colors.orangeWheel }} className="h-6 w-6" />
              </div>
            </div>
            <h3 
              style={{ color: colors.pureWhite }}
              className="text-2xl font-bold mb-1"
            >
              {notifications.filter(n => n.type === 'exam').length}
            </h3>
            <p 
              style={{ color: colors.moss }}
              className="text-sm"
            >
              Exam Updates
            </p>
          </div>

          <div
            style={{
              backgroundColor: colors.eerieBlack,
              borderColor: `${colors.moss}20`,
            }}
            className="rounded-2xl border-2 p-6"
          >
            <div className="flex items-center justify-between mb-3">
              <div 
                style={{ backgroundColor: `${colors.moss}20` }}
                className="p-3 rounded-xl"
              >
                <TrendingUp style={{ color: colors.moss }} className="h-6 w-6" />
              </div>
            </div>
            <h3 
              style={{ color: colors.pureWhite }}
              className="text-2xl font-bold mb-1"
            >
              This Week
            </h3>
            <p 
              style={{ color: colors.moss }}
              className="text-sm"
            >
              7 New Updates
            </p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center space-x-3 mb-6 overflow-x-auto pb-2">
          <Filter style={{ color: colors.moss }} className="h-5 w-5 flex-shrink-0" />
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setSelectedFilter(filter.id)}
              style={{
                backgroundColor: selectedFilter === filter.id ? colors.eerieBlack : 'transparent',
                borderColor: selectedFilter === filter.id ? colors.hotOrange : `${colors.moss}30`,
                color: selectedFilter === filter.id ? colors.hotOrange : colors.moss,
                background: selectedFilter === filter.id 
                  ? `linear-gradient(to right, ${colors.hotOrange}20, ${colors.orangeWheel}20)` 
                  : 'transparent',
              }}
              className="flex items-center space-x-2 px-5 py-2 rounded-lg border-2 font-medium whitespace-nowrap transition-all duration-200"
            >
              <span>{filter.name}</span>
              {filter.count > 0 && (
                <span
                  style={{
                    backgroundColor: selectedFilter === filter.id ? colors.hotOrange : `${colors.moss}40`,
                    color: selectedFilter === filter.id ? colors.pureWhite : colors.pureWhite,
                  }}
                  className="px-2 py-0.5 rounded-full text-xs font-bold"
                >
                  {filter.count}
                </span>
              )}
            </button>
          ))}
        </div>

        {/* Notifications List */}
        {filteredNotifications.length > 0 ? (
          <div className="space-y-4">
            {filteredNotifications.map((notification) => {
              const Icon = notification.icon;
              const priority = getPriorityBadge(notification.priority);

              return (
                <div
                  key={notification.id}
                  style={{
                    backgroundColor: notification.isRead ? colors.eerieBlack : `${colors.eerieBlack}`,
                    borderColor: notification.isRead ? `${colors.moss}20` : colors.hotOrange,
                    borderLeftWidth: notification.isRead ? '2px' : '4px',
                  }}
                  className="rounded-2xl border-2 p-6 transition-all duration-300 hover:shadow-xl group"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateX(4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateX(0)';
                  }}
                >
                  <div className="flex items-start space-x-4">
                    {/* Icon */}
                    <div 
                      style={{ 
                        backgroundColor: `${notification.color}20`,
                      }}
                      className="p-3 rounded-xl flex-shrink-0"
                    >
                      <Icon 
                        style={{ color: notification.color }}
                        className="h-6 w-6"
                      />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 
                              style={{ color: colors.pureWhite }}
                              className="text-lg font-bold"
                            >
                              {notification.title}
                            </h3>
                            {!notification.isRead && (
                              <div 
                                style={{ backgroundColor: colors.hotOrange }}
                                className="h-2 w-2 rounded-full animate-pulse"
                              ></div>
                            )}
                          </div>
                          <div className="flex items-center space-x-2 mb-2">
                            <span
                              style={{
                                backgroundColor: `${priority.color}20`,
                                color: priority.color,
                              }}
                              className="px-2 py-0.5 rounded-full text-xs font-semibold"
                            >
                              {priority.label}
                            </span>
                            <div className="flex items-center space-x-1">
                              <Clock 
                                style={{ color: colors.moss }}
                                className="h-3 w-3"
                              />
                              <span 
                                style={{ color: colors.moss }}
                                className="text-xs"
                              >
                                {notification.time}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center space-x-2 ml-4">
                          {!notification.isRead && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              style={{
                                backgroundColor: colors.smokyBlack,
                                color: colors.moss,
                              }}
                              className="p-2 rounded-lg hover:text-hotOrange transition-colors"
                              title="Mark as read"
                            >
                              <Check className="h-4 w-4" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            style={{
                              backgroundColor: colors.smokyBlack,
                              color: colors.moss,
                            }}
                            className="p-2 rounded-lg hover:text-hotOrange transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      <p 
                        style={{ color: colors.moss }}
                        className="text-sm leading-relaxed mb-4"
                      >
                        {notification.message}
                      </p>

                      {/* Action Link */}
                      <Link
                        to={notification.link}
                        style={{
                          backgroundColor: `${colors.hotOrange}10`,
                          color: colors.hotOrange,
                        }}
                        className="inline-flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 hover:bg-opacity-100"
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = `${colors.hotOrange}20`;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = `${colors.hotOrange}10`;
                        }}
                      >
                        <span>View Details</span>
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div 
            style={{
              backgroundColor: colors.eerieBlack,
              borderColor: `${colors.moss}30`,
            }}
            className="text-center py-16 rounded-2xl border-2"
          >
            <Bell 
              style={{ color: colors.moss }}
              className="h-16 w-16 mx-auto mb-4 opacity-50"
            />
            <h3 
              style={{ color: colors.pureWhite }}
              className="text-xl font-bold mb-2"
            >
              No Notifications
            </h3>
            <p 
              style={{ color: colors.moss }}
              className="mb-6"
            >
              You're all caught up! No new notifications to show.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notifications;
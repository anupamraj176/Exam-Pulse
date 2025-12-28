import { useState, useEffect } from 'react';
import { AlertCircle, Bell, Calendar, FileText, TrendingUp } from 'lucide-react';

const LiveTicker = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

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

  // Notification data
  const notifications = [
    {
      icon: AlertCircle,
      type: 'URGENT',
      message: 'SSC CGL 2025 Notification Released - Apply Before Jan 15, 2025',
      time: '2 hours ago',
      color: colors.hotOrange,
    },
    {
      icon: Calendar,
      type: 'EXAM DATE',
      message: 'IBPS PO Mains Exam Scheduled for February 5, 2025',
      time: '4 hours ago',
      color: colors.orangeWheel,
    },
    {
      icon: FileText,
      type: 'RESULT',
      message: 'RRB NTPC Result Declared - Check Your Score Now',
      time: '6 hours ago',
      color: colors.moss,
    },
    {
      icon: Bell,
      type: 'NEW VACANCY',
      message: 'UPSC CSE 2025: 1000+ Vacancies Announced for Civil Services',
      time: '8 hours ago',
      color: colors.hotOrange,
    },
    {
      icon: TrendingUp,
      type: 'TRENDING',
      message: 'New Study Material Added: Indian Polity Complete Notes PDF',
      time: '10 hours ago',
      color: colors.orangeWheel,
    },
    {
      icon: AlertCircle,
      type: 'UPDATE',
      message: 'BPSC 69th CCE Exam Pattern Changed - Check Latest Updates',
      time: '12 hours ago',
      color: colors.moss,
    },
  ];

  // Auto-rotate notifications
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % notifications.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [notifications.length]);

  const currentNotification = notifications[currentIndex];
  const Icon = currentNotification.icon;

  return (
    <div 
      style={{
        backgroundColor: colors.eerieBlack,
        borderTop: `2px solid ${colors.hotOrange}`,
        borderBottom: `2px solid ${colors.hotOrange}`,
      }}
      className="relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center py-3">
          
          {/* "BREAKING NEWS" Badge */}
          <div 
            style={{
              background: `linear-gradient(to right, ${colors.hotOrange}, ${colors.orangeWheel})`,
              color: colors.pureWhite,
            }}
            className="flex items-center space-x-2 px-4 py-2 rounded-lg font-bold text-sm whitespace-nowrap mr-4 animate-pulse"
          >
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">LIVE UPDATES</span>
            <span className="sm:hidden">LIVE</span>
          </div>

          {/* Scrolling Notification */}
          <div className="flex-1 overflow-hidden">
            <div 
              className="transition-all duration-500 ease-in-out"
              style={{
                transform: `translateX(${currentIndex * -100}%)`,
                display: 'flex',
              }}
            >
              {notifications.map((notification, index) => {
                const NotifIcon = notification.icon;
                return (
                  <div
                    key={index}
                    className="flex items-center space-x-3 min-w-full"
                  >
                    <div
                      style={{
                        backgroundColor: `${notification.color}20`,
                        color: notification.color,
                      }}
                      className="flex items-center space-x-1 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap"
                    >
                      <NotifIcon className="h-3 w-3" />
                      <span>{notification.type}</span>
                    </div>

                    <p
                      style={{ color: colors.pureWhite }}
                      className="text-sm md:text-base font-medium flex-1"
                    >
                      {notification.message}
                    </p>

                    <span
                      style={{ color: colors.moss }}
                      className="text-xs whitespace-nowrap hidden md:inline"
                    >
                      {notification.time}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Navigation Dots */}
          <div className="hidden lg:flex items-center space-x-2 ml-4">
            {notifications.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                style={{
                  backgroundColor: index === currentIndex ? colors.hotOrange : colors.moss,
                  opacity: index === currentIndex ? 1 : 0.3,
                }}
                className="h-2 w-2 rounded-full transition-all duration-300"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.5)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              />
            ))}
          </div>

          {/* View All Button */}
          <button
            style={{
              backgroundColor: 'transparent',
              borderColor: colors.moss,
              color: colors.moss,
            }}
            className="hidden sm:flex items-center space-x-2 px-4 py-2 rounded-lg border-2 text-sm font-semibold ml-4 whitespace-nowrap transition-all duration-200"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = `${colors.moss}20`;
              e.currentTarget.style.borderColor = colors.hotOrange;
              e.currentTarget.style.color = colors.hotOrange;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.borderColor = colors.moss;
              e.currentTarget.style.color = colors.moss;
            }}
          >
            <span>View All</span>
          </button>
        </div>
      </div>

      {/* Animated Background Glow */}
      <div 
        style={{
          background: `linear-gradient(90deg, transparent, ${colors.hotOrange}10, transparent)`,
        }}
        className="absolute top-0 left-0 w-full h-full pointer-events-none opacity-50"
      ></div>
    </div>
  );
};

export default LiveTicker;
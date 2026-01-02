import { useState, useEffect } from 'react';
import { Bell, X, Check, Trash2 } from 'lucide-react';
import { useNotificationStore } from '../../store/notificationStore';

const NotificationBell = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { notifications, unreadCount, fetchNotifications, markAsRead, markAllAsRead } = useNotificationStore();
  
  const colors = {
    moss: '#99A57D',
    vanilla: '#F6EDD4',
    asparagus: '#6B8F4A',
    eerieBlack: '#1C1B17',
  };

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const handleBellClick = () => {
    setIsOpen(!isOpen);
  };

  const handleNotificationClick = (id) => {
    markAsRead(id);
  };

  return (
    <div className={`relative ${className}`}>
      <button
        onClick={handleBellClick}
        className="relative p-2 rounded-lg hover:bg-white/10 transition-colors"
      >
        <Bell className="w-6 h-6" style={{ color: colors.vanilla }} />
        {unreadCount > 0 && (
          <span
            className="absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold"
            style={{ backgroundColor: '#EF4444', color: 'white' }}
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div
            className="absolute right-0 top-full mt-2 w-80 max-h-96 rounded-xl shadow-xl overflow-hidden z-50"
            style={{ backgroundColor: colors.eerieBlack, border: `1px solid ${colors.moss}30` }}
          >
            <div
              className="flex items-center justify-between p-4 border-b"
              style={{ borderColor: `${colors.moss}20` }}
            >
              <h3 className="font-semibold" style={{ color: colors.vanilla }}>
                Notifications
              </h3>
              {unreadCount > 0 && (
                <button
                  onClick={markAllAsRead}
                  className="text-xs px-2 py-1 rounded hover:bg-white/10 transition-colors"
                  style={{ color: colors.moss }}
                >
                  Mark all read
                </button>
              )}
            </div>

            <div className="overflow-y-auto max-h-72">
              {notifications.length === 0 ? (
                <div className="p-8 text-center" style={{ color: `${colors.vanilla}60` }}>
                  <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No notifications</p>
                </div>
              ) : (
                notifications.slice(0, 10).map((notification) => (
                  <div
                    key={notification._id}
                    onClick={() => handleNotificationClick(notification._id)}
                    className={`p-4 border-b cursor-pointer hover:bg-white/5 transition-colors ${
                      !notification.read ? 'bg-white/5' : ''
                    }`}
                    style={{ borderColor: `${colors.moss}10` }}
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                          notification.read ? 'opacity-0' : ''
                        }`}
                        style={{ backgroundColor: colors.asparagus }}
                      />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate" style={{ color: colors.vanilla }}>
                          {notification.title}
                        </p>
                        <p className="text-xs mt-1" style={{ color: `${colors.vanilla}60` }}>
                          {notification.message}
                        </p>
                        <p className="text-xs mt-1" style={{ color: `${colors.vanilla}40` }}>
                          {new Date(notification.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {notifications.length > 0 && (
              <div
                className="p-3 text-center border-t"
                style={{ borderColor: `${colors.moss}20` }}
              >
                <a
                  href="/notifications"
                  className="text-sm hover:underline"
                  style={{ color: colors.moss }}
                >
                  View all notifications
                </a>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default NotificationBell;

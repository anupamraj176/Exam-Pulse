import { Bell, Check, Trash2, ExternalLink } from 'lucide-react';
import Card from '../common/Card';

const NotificationList = ({ 
  notifications = [], 
  onMarkAsRead, 
  onDelete,
  onNotificationClick,
  emptyMessage = 'No notifications'
}) => {
  const colors = {
    moss: '#99A57D',
    vanilla: '#F6EDD4',
    asparagus: '#6B8F4A',
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'exam': return '#3B82F6';
      case 'result': return '#10B981';
      case 'deadline': return '#EF4444';
      case 'update': return '#F59E0B';
      default: return colors.moss;
    }
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'exam': return '📝';
      case 'result': return '🏆';
      case 'deadline': return '⏰';
      case 'update': return '🔔';
      default: return '📢';
    }
  };

  if (notifications.length === 0) {
    return (
      <Card className="text-center py-12">
        <Bell className="w-12 h-12 mx-auto mb-4 opacity-50" style={{ color: colors.moss }} />
        <p style={{ color: `${colors.vanilla}80` }}>{emptyMessage}</p>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {notifications.map((notification) => (
        <Card
          key={notification._id || notification.id}
          padding="p-4"
          className={`${!notification.read ? 'border-l-4' : ''}`}
          style={{ borderLeftColor: !notification.read ? getTypeColor(notification.type) : 'transparent' }}
          onClick={() => onNotificationClick?.(notification)}
        >
          <div className="flex items-start gap-4">
            {/* Icon */}
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 text-lg"
              style={{ backgroundColor: `${getTypeColor(notification.type)}20` }}
            >
              {getTypeIcon(notification.type)}
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h4
                  className={`font-medium ${!notification.read ? 'font-semibold' : ''}`}
                  style={{ color: colors.vanilla }}
                >
                  {notification.title}
                </h4>
                {!notification.read && (
                  <div
                    className="w-2 h-2 rounded-full flex-shrink-0 mt-2"
                    style={{ backgroundColor: colors.asparagus }}
                  />
                )}
              </div>
              
              <p className="text-sm mt-1" style={{ color: `${colors.vanilla}70` }}>
                {notification.message}
              </p>
              
              <div className="flex items-center justify-between mt-3">
                <span className="text-xs" style={{ color: `${colors.vanilla}50` }}>
                  {new Date(notification.createdAt).toLocaleString()}
                </span>
                
                <div className="flex items-center gap-2">
                  {notification.link && (
                    <a
                      href={notification.link}
                      className="p-1.5 rounded hover:bg-white/10 transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <ExternalLink className="w-4 h-4" style={{ color: colors.moss }} />
                    </a>
                  )}
                  
                  {!notification.read && onMarkAsRead && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onMarkAsRead(notification._id || notification.id);
                      }}
                      className="p-1.5 rounded hover:bg-white/10 transition-colors"
                      title="Mark as read"
                    >
                      <Check className="w-4 h-4" style={{ color: colors.asparagus }} />
                    </button>
                  )}
                  
                  {onDelete && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onDelete(notification._id || notification.id);
                      }}
                      className="p-1.5 rounded hover:bg-red-500/20 transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4 text-red-400" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default NotificationList;

import { Bookmark, ExternalLink, Trash2 } from 'lucide-react';
import Card from '../common/Card';

const BookmarkedItems = ({ 
  items = [], 
  onRemove, 
  onOpen,
  emptyMessage = 'No bookmarks yet'
}) => {
  const colors = {
    moss: '#99A57D',
    vanilla: '#F6EDD4',
    asparagus: '#6B8F4A',
  };

  if (items.length === 0) {
    return (
      <Card className="text-center py-12">
        <Bookmark className="w-12 h-12 mx-auto mb-4 opacity-50" style={{ color: colors.moss }} />
        <p style={{ color: `${colors.vanilla}80` }}>{emptyMessage}</p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {items.map((item, index) => (
        <Card key={item._id || index} padding="p-4" className="flex items-center justify-between">
          <div className="flex-1 min-w-0">
            <h4 className="font-medium truncate" style={{ color: colors.vanilla }}>
              {item.title}
            </h4>
            <p className="text-sm truncate" style={{ color: `${colors.vanilla}60` }}>
              {item.description || item.type || 'Resource'}
            </p>
          </div>
          
          <div className="flex items-center gap-2 ml-4">
            {onOpen && (
              <button
                onClick={() => onOpen(item)}
                className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                title="Open"
              >
                <ExternalLink className="w-4 h-4" style={{ color: colors.moss }} />
              </button>
            )}
            {onRemove && (
              <button
                onClick={() => onRemove(item._id || item.id)}
                className="p-2 rounded-lg hover:bg-red-500/20 transition-colors"
                title="Remove"
              >
                <Trash2 className="w-4 h-4 text-red-400" />
              </button>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};

export default BookmarkedItems;

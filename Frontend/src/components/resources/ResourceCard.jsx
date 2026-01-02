import { Download, Eye, Bookmark, BookmarkCheck, ExternalLink, FileText, Video, Book } from 'lucide-react';
import Card from '../common/Card';

const ResourceCard = ({ 
  resource, 
  onView,
  onDownload,
  onBookmark,
  isBookmarked = false,
  className = ''
}) => {
  const colors = {
    moss: '#99A57D',
    vanilla: '#F6EDD4',
    asparagus: '#6B8F4A',
    eerieBlack: '#1C1B17',
  };

  const getTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
      case 'video': return Video;
      case 'book': return Book;
      default: return FileText;
    }
  };

  const getTypeColor = (type) => {
    switch (type?.toLowerCase()) {
      case 'notes': return '#3B82F6';
      case 'pyq': return '#F59E0B';
      case 'mock-test': return '#10B981';
      case 'video': return '#EF4444';
      case 'book': return '#8B5CF6';
      default: return colors.moss;
    }
  };

  const TypeIcon = getTypeIcon(resource?.type);
  const typeColor = getTypeColor(resource?.type);

  return (
    <Card padding="p-0" className={`overflow-hidden ${className}`}>
      {/* Header with type badge */}
      <div className="p-4 pb-0">
        <div className="flex items-start justify-between gap-2 mb-3">
          <span
            className="px-2 py-1 rounded-full text-xs font-medium"
            style={{ backgroundColor: `${typeColor}20`, color: typeColor }}
          >
            {resource?.type || 'Resource'}
          </span>
          
          <button
            onClick={() => onBookmark?.(resource)}
            className="p-1.5 rounded-lg hover:bg-white/10 transition-colors"
          >
            {isBookmarked ? (
              <BookmarkCheck className="w-5 h-5" style={{ color: colors.asparagus }} />
            ) : (
              <Bookmark className="w-5 h-5" style={{ color: `${colors.vanilla}60` }} />
            )}
          </button>
        </div>

        {/* Title and description */}
        <h3 className="font-semibold mb-2 line-clamp-2" style={{ color: colors.vanilla }}>
          {resource?.title || 'Untitled Resource'}
        </h3>
        
        <p className="text-sm mb-3 line-clamp-2" style={{ color: `${colors.vanilla}60` }}>
          {resource?.description || 'No description available'}
        </p>

        {/* Tags */}
        {resource?.tags && resource.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-3">
            {resource.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="px-2 py-0.5 rounded text-xs"
                style={{ backgroundColor: `${colors.moss}20`, color: `${colors.vanilla}80` }}
              >
                {tag}
              </span>
            ))}
            {resource.tags.length > 3 && (
              <span className="text-xs" style={{ color: `${colors.vanilla}50` }}>
                +{resource.tags.length - 3} more
              </span>
            )}
          </div>
        )}
      </div>

      {/* Footer with actions */}
      <div 
        className="flex items-center justify-between p-3 mt-2 border-t"
        style={{ borderColor: `${colors.moss}20`, backgroundColor: `${colors.eerieBlack}80` }}
      >
        <div className="flex items-center gap-2 text-xs" style={{ color: `${colors.vanilla}50` }}>
          <TypeIcon className="w-4 h-4" />
          <span>{resource?.subject || 'General'}</span>
          {resource?.downloads > 0 && (
            <>
              <span>•</span>
              <span>{resource.downloads} downloads</span>
            </>
          )}
        </div>

        <div className="flex items-center gap-1">
          {onView && (
            <button
              onClick={() => onView(resource)}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              title="View"
            >
              <Eye className="w-4 h-4" style={{ color: colors.moss }} />
            </button>
          )}
          
          {onDownload && resource?.fileUrl && (
            <button
              onClick={() => onDownload(resource)}
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              title="Download"
            >
              <Download className="w-4 h-4" style={{ color: colors.moss }} />
            </button>
          )}
          
          {resource?.link && (
            <a
              href={resource.link}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-lg hover:bg-white/10 transition-colors"
              title="Open link"
            >
              <ExternalLink className="w-4 h-4" style={{ color: colors.moss }} />
            </a>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ResourceCard;

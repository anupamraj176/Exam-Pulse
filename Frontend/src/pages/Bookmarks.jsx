import { useState, useEffect } from 'react';
import { 
  Bookmark, 
  BookOpen, 
  FileText, 
  Video, 
  Trash2, 
  ExternalLink,
  Search,
  Filter,
  Grid,
  List,
  FolderOpen,
  Clock,
  Eye,
  X,
  AlertCircle
} from 'lucide-react';
import useAuthStore from '../store/authStore';
import api from '../services/api';
import Loader from '../components/common/Loader';

const Bookmarks = () => {
  const { user, isAuthenticated } = useAuthStore();
  const [bookmarks, setBookmarks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState('all');
  const [sortBy, setSortBy] = useState('recent');
  const [message, setMessage] = useState({ type: '', text: '' });

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

  const resourceTypes = [
    { id: 'all', name: 'All', icon: FolderOpen },
    { id: 'notes', name: 'Notes', icon: FileText },
    { id: 'pyq', name: 'PYQ', icon: BookOpen },
    { id: 'video', name: 'Videos', icon: Video },
  ];

  useEffect(() => {
    if (isAuthenticated) {
      fetchBookmarks();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const fetchBookmarks = async () => {
    try {
      const response = await api.get('/users/bookmarks');
      if (response.data.success) {
        setBookmarks(response.data.data?.bookmarks || response.data.data || []);
      }
    } catch (error) {
      console.error('Failed to fetch bookmarks:', error);
      // Use local storage fallback
      const localBookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
      setBookmarks(localBookmarks);
    } finally {
      setLoading(false);
    }
  };

  const removeBookmark = async (resourceId) => {
    try {
      await api.delete(`/users/bookmarks/${resourceId}`);
      setBookmarks(prev => prev.filter(b => (b._id || b.resourceId) !== resourceId));
      setMessage({ type: 'success', text: 'Bookmark removed' });
      
      // Also remove from local storage
      const localBookmarks = JSON.parse(localStorage.getItem('bookmarks') || '[]');
      localStorage.setItem('bookmarks', JSON.stringify(
        localBookmarks.filter(b => b.resourceId !== resourceId)
      ));
    } catch (error) {
      console.error('Failed to remove bookmark:', error);
      setMessage({ type: 'error', text: 'Failed to remove bookmark' });
    }
  };

  const filteredBookmarks = bookmarks
    .filter(bookmark => {
      const resource = bookmark.resource || bookmark;
      if (filterType !== 'all' && resource.type !== filterType) return false;
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        return (
          resource.title?.toLowerCase().includes(query) ||
          resource.category?.toLowerCase().includes(query) ||
          resource.description?.toLowerCase().includes(query)
        );
      }
      return true;
    })
    .sort((a, b) => {
      const resourceA = a.resource || a;
      const resourceB = b.resource || b;
      
      if (sortBy === 'recent') {
        return new Date(b.bookmarkedAt || b.createdAt) - new Date(a.bookmarkedAt || a.createdAt);
      }
      if (sortBy === 'title') {
        return (resourceA.title || '').localeCompare(resourceB.title || '');
      }
      return 0;
    });

  const getTypeIcon = (type) => {
    switch (type) {
      case 'notes': return FileText;
      case 'pyq': return BookOpen;
      case 'video': return Video;
      default: return FileText;
    }
  };

  if (!isAuthenticated) {
    return (
      <div 
        style={{ backgroundColor: colors.smokyBlack }}
        className="min-h-screen pt-24 pb-12 flex items-center justify-center"
      >
        <div 
          style={{ backgroundColor: colors.eerieBlack, borderColor: colors.hotOrange }}
          className="p-8 rounded-2xl border-2 text-center max-w-md"
        >
          <Bookmark style={{ color: colors.hotOrange }} className="h-16 w-16 mx-auto mb-4" />
          <h2 style={{ color: colors.pureWhite }} className="text-2xl font-bold mb-2">
            Please Login
          </h2>
          <p style={{ color: colors.moss }} className="mb-4">
            Login to view your bookmarks.
          </p>
          <a 
            href="/login"
            style={{ background: `linear-gradient(to right, ${colors.hotOrange}, ${colors.orangeWheel})` }}
            className="inline-block px-6 py-3 rounded-xl text-white font-semibold"
          >
            Login
          </a>
        </div>
      </div>
    );
  }

  if (loading) {
    return <Loader />;
  }

  return (
    <div 
      style={{ backgroundColor: colors.smokyBlack }}
      className="min-h-screen pt-24 pb-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 style={{ color: colors.pureWhite }} className="text-3xl font-bold mb-2">
              My Bookmarks
            </h1>
            <p style={{ color: colors.moss }}>
              {bookmarks.length} saved resources
            </p>
          </div>
        </div>

        {/* Message */}
        {message.text && (
          <div 
            style={{ 
              backgroundColor: message.type === 'success' ? `${colors.moss}20` : `${colors.hotOrange}20`,
              borderColor: message.type === 'success' ? colors.moss : colors.hotOrange,
              color: message.type === 'success' ? colors.moss : colors.hotOrange,
            }}
            className="p-4 rounded-xl border-2 mb-6 flex items-center justify-between"
          >
            <span>{message.text}</span>
            <button onClick={() => setMessage({ type: '', text: '' })}>
              <X className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* Filters & Search */}
        <div 
          style={{ backgroundColor: colors.eerieBlack, borderColor: `${colors.moss}30` }}
          className="rounded-2xl border-2 p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search style={{ color: colors.moss }} className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search bookmarks..."
                style={{ backgroundColor: colors.night, borderColor: `${colors.moss}30`, color: colors.pureWhite }}
                className="w-full pl-12 pr-4 py-3 rounded-xl border-2 outline-none"
              />
            </div>

            {/* Type Filter */}
            <div className="flex items-center space-x-2">
              {resourceTypes.map(type => (
                <button
                  key={type.id}
                  onClick={() => setFilterType(type.id)}
                  style={{ 
                    backgroundColor: filterType === type.id ? colors.hotOrange : colors.night,
                    borderColor: filterType === type.id ? colors.hotOrange : `${colors.moss}30`,
                    color: filterType === type.id ? colors.pureWhite : colors.moss,
                  }}
                  className="px-4 py-2 rounded-xl border-2 flex items-center space-x-2 font-medium"
                >
                  <type.icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{type.name}</span>
                </button>
              ))}
            </div>

            {/* Sort & View */}
            <div className="flex items-center space-x-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{ backgroundColor: colors.night, borderColor: `${colors.moss}30`, color: colors.pureWhite }}
                className="px-4 py-2 rounded-xl border-2 outline-none"
              >
                <option value="recent">Recent</option>
                <option value="title">Title</option>
              </select>

              <button
                onClick={() => setViewMode('grid')}
                style={{ 
                  backgroundColor: viewMode === 'grid' ? colors.hotOrange : colors.night,
                  borderColor: viewMode === 'grid' ? colors.hotOrange : `${colors.moss}30`,
                }}
                className="p-2 rounded-xl border-2"
              >
                <Grid style={{ color: viewMode === 'grid' ? colors.pureWhite : colors.moss }} className="h-5 w-5" />
              </button>

              <button
                onClick={() => setViewMode('list')}
                style={{ 
                  backgroundColor: viewMode === 'list' ? colors.hotOrange : colors.night,
                  borderColor: viewMode === 'list' ? colors.hotOrange : `${colors.moss}30`,
                }}
                className="p-2 rounded-xl border-2"
              >
                <List style={{ color: viewMode === 'list' ? colors.pureWhite : colors.moss }} className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Bookmarks */}
        {filteredBookmarks.length === 0 ? (
          <div 
            style={{ backgroundColor: colors.eerieBlack, borderColor: `${colors.moss}30` }}
            className="rounded-2xl border-2 p-12 text-center"
          >
            <Bookmark style={{ color: colors.moss }} className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <h2 style={{ color: colors.pureWhite }} className="text-xl font-bold mb-2">
              {searchQuery || filterType !== 'all' ? 'No matching bookmarks' : 'No bookmarks yet'}
            </h2>
            <p style={{ color: colors.moss }} className="mb-6">
              {searchQuery || filterType !== 'all' 
                ? 'Try adjusting your filters'
                : 'Start bookmarking resources to access them later'
              }
            </p>
            <a 
              href="/resources"
              style={{ background: `linear-gradient(to right, ${colors.hotOrange}, ${colors.orangeWheel})` }}
              className="inline-block px-6 py-3 rounded-xl text-white font-semibold"
            >
              Browse Resources
            </a>
          </div>
        ) : viewMode === 'grid' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBookmarks.map((bookmark, index) => {
              const resource = bookmark.resource || bookmark;
              const TypeIcon = getTypeIcon(resource.type);
              
              return (
                <div
                  key={resource._id || index}
                  style={{ backgroundColor: colors.eerieBlack, borderColor: `${colors.moss}30` }}
                  className="rounded-2xl border-2 overflow-hidden group hover:border-opacity-60 transition-all"
                >
                  {/* Thumbnail */}
                  <div 
                    style={{ backgroundColor: colors.night }}
                    className="aspect-video relative"
                  >
                    {resource.thumbnail ? (
                      <img 
                        src={resource.thumbnail} 
                        alt={resource.title}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <TypeIcon style={{ color: colors.moss }} className="h-16 w-16 opacity-30" />
                      </div>
                    )}
                    
                    {/* Type Badge */}
                    <span
                      style={{ backgroundColor: colors.hotOrange }}
                      className="absolute top-3 left-3 px-3 py-1 rounded-lg text-white text-sm font-medium capitalize"
                    >
                      {resource.type}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 style={{ color: colors.pureWhite }} className="font-bold text-lg mb-2 line-clamp-2">
                      {resource.title}
                    </h3>
                    
                    <p style={{ color: colors.moss }} className="text-sm mb-4 line-clamp-2">
                      {resource.description || 'No description available'}
                    </p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3 text-sm">
                        <span style={{ color: colors.moss }} className="flex items-center space-x-1">
                          <Clock className="h-4 w-4" />
                          <span>{new Date(bookmark.bookmarkedAt || resource.createdAt).toLocaleDateString()}</span>
                        </span>
                      </div>

                      <div className="flex items-center space-x-2">
                        {resource.fileUrl && (
                          <a
                            href={resource.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ backgroundColor: `${colors.moss}20` }}
                            className="p-2 rounded-lg"
                          >
                            <ExternalLink style={{ color: colors.moss }} className="h-4 w-4" />
                          </a>
                        )}
                        <button
                          onClick={() => removeBookmark(resource._id || bookmark.resourceId)}
                          style={{ backgroundColor: `${colors.hotOrange}20` }}
                          className="p-2 rounded-lg"
                        >
                          <Trash2 style={{ color: colors.hotOrange }} className="h-4 w-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="space-y-4">
            {filteredBookmarks.map((bookmark, index) => {
              const resource = bookmark.resource || bookmark;
              const TypeIcon = getTypeIcon(resource.type);
              
              return (
                <div
                  key={resource._id || index}
                  style={{ backgroundColor: colors.eerieBlack, borderColor: `${colors.moss}30` }}
                  className="rounded-2xl border-2 p-4 flex items-center space-x-4"
                >
                  {/* Icon */}
                  <div 
                    style={{ backgroundColor: `${colors.hotOrange}20` }}
                    className="p-4 rounded-xl shrink-0"
                  >
                    <TypeIcon style={{ color: colors.hotOrange }} className="h-8 w-8" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <h3 style={{ color: colors.pureWhite }} className="font-bold text-lg mb-1 truncate">
                      {resource.title}
                    </h3>
                    <div className="flex items-center space-x-4 text-sm">
                      <span style={{ color: colors.hotOrange }} className="capitalize">
                        {resource.type}
                      </span>
                      <span style={{ color: colors.moss }}>•</span>
                      <span style={{ color: colors.moss }}>
                        {resource.category}
                      </span>
                      <span style={{ color: colors.moss }}>•</span>
                      <span style={{ color: colors.moss }}>
                        Saved {new Date(bookmark.bookmarkedAt || resource.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center space-x-2 shrink-0">
                    {resource.fileUrl && (
                      <a
                        href={resource.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ backgroundColor: colors.moss }}
                        className="px-4 py-2 rounded-xl text-white font-medium flex items-center space-x-2"
                      >
                        <Eye className="h-4 w-4" />
                        <span>View</span>
                      </a>
                    )}
                    <button
                      onClick={() => removeBookmark(resource._id || bookmark.resourceId)}
                      style={{ backgroundColor: `${colors.hotOrange}20` }}
                      className="p-2 rounded-xl"
                    >
                      <Trash2 style={{ color: colors.hotOrange }} className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Bookmarks;

import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Download, 
  Eye, 
  Star, 
  Clock,
  TrendingUp,
  FileText,
  Video,
  CheckCircle,
  ArrowRight,
  Filter,
  Loader
} from 'lucide-react';
import useResourceStore from '../../store/resourceStore';

const FeaturedResources = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const { featuredResources, fetchFeaturedResources, isLoading } = useResourceStore();

  // Fetch featured resources on mount
  useEffect(() => {
    fetchFeaturedResources();
  }, [fetchFeaturedResources]);

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
    { id: 'all', name: 'All Resources', icon: BookOpen },
    { id: 'notes', name: 'Notes', icon: FileText },
    { id: 'pyq', name: 'PYQs', icon: CheckCircle },
    { id: 'video', name: 'Videos', icon: Video },
  ];

  // Type icons mapping
  const typeIcons = {
    notes: '📚',
    pdf: '📄',
    pyq: '🔢',
    video: '🎥',
    ebook: '📖',
  };

  // Color mapping for resources based on type
  const getResourceColor = (type) => {
    switch(type) {
      case 'notes': return colors.hotOrange;
      case 'pyq': return colors.orangeWheel;
      case 'video': return colors.hotOrange;
      default: return colors.moss;
    }
  };

  // Filter resources based on active filter
  const filteredResources = activeFilter === 'all' 
    ? (featuredResources || [])
    : (featuredResources || []).filter(r => r.type === activeFilter);

  return (
    <div 
      style={{ backgroundColor: colors.night }}
      className="py-16 lg:py-24 relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          style={{
            background: `radial-gradient(circle at 30% 30%, ${colors.orangeWheel}06 0%, transparent 50%)`,
          }}
          className="absolute top-0 left-0 w-[600px] h-[600px] blur-3xl"
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-10">
          <div className="mb-6 md:mb-0">
            <div className="flex items-center space-x-2 mb-3">
              <TrendingUp style={{ color: colors.hotOrange }} className="h-6 w-6" />
              <span 
                style={{ color: colors.moss }}
                className="text-sm font-semibold uppercase tracking-wider"
              >
                Featured Resources
              </span>
            </div>
            <h2 
              style={{ color: colors.pureWhite }}
              className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-3"
            >
              Trending Study Materials
            </h2>
            <p 
              style={{ color: colors.moss }}
              className="text-lg max-w-2xl"
            >
              Handpicked resources trusted by thousands of successful candidates
            </p>
          </div>

          <Link
            to="/resources"
            style={{
              backgroundColor: 'transparent',
              borderColor: colors.hotOrange,
              color: colors.hotOrange,
            }}
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl border-2 font-semibold transition-all duration-200"
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = `${colors.hotOrange}20`;
              e.currentTarget.style.transform = 'translateY(-2px)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.transform = 'translateY(0)';
            }}
          >
            <span>View All Resources</span>
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center space-x-3 mb-8 overflow-x-auto pb-2">
          <Filter style={{ color: colors.moss }} className="h-5 w-5 flex-shrink-0" />
          {filters.map((filter) => {
            const Icon = filter.icon;
            return (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                style={{
                  backgroundColor: activeFilter === filter.id 
                    ? `linear-gradient(to right, ${colors.hotOrange}, ${colors.orangeWheel})` 
                    : colors.eerieBlack,
                  borderColor: activeFilter === filter.id ? colors.hotOrange : `${colors.moss}30`,
                  color: activeFilter === filter.id ? colors.pureWhite : colors.moss,
                  background: activeFilter === filter.id 
                    ? `linear-gradient(to right, ${colors.hotOrange}, ${colors.orangeWheel})` 
                    : colors.eerieBlack,
                }}
                className="flex items-center space-x-2 px-5 py-2.5 rounded-lg border-2 font-medium whitespace-nowrap transition-all duration-200"
                onMouseEnter={(e) => {
                  if (activeFilter !== filter.id) {
                    e.currentTarget.style.borderColor = colors.hotOrange;
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeFilter !== filter.id) {
                    e.currentTarget.style.borderColor = `${colors.moss}30`;
                  }
                }}
              >
                <Icon className="h-4 w-4" />
                <span>{filter.name}</span>
              </button>
            );
          })}
        </div>

        {/* Resources Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <Loader style={{ color: colors.hotOrange }} className="h-8 w-8 animate-spin" />
          </div>
        ) : filteredResources.length === 0 ? (
          <div className="text-center py-16">
            <p style={{ color: colors.moss }}>No resources found</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <div
              key={resource._id || resource.id}
              style={{
                backgroundColor: colors.eerieBlack,
                borderColor: `${colors.moss}20`,
              }}
              className="rounded-2xl border-2 overflow-hidden transition-all duration-300 group hover:shadow-2xl"
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = colors.hotOrange;
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = `0 20px 40px ${colors.hotOrange}20`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = `${colors.moss}20`;
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Card Header */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div 
                    style={{
                      background: `linear-gradient(135deg, ${getResourceColor(resource.type)}20, ${getResourceColor(resource.type)}10)`,
                    }}
                    className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl"
                  >
                    {typeIcons[resource.type] || '📄'}
                  </div>
                  
                  {resource.isTrending && (
                    <div 
                      style={{
                        backgroundColor: `${colors.hotOrange}20`,
                        color: colors.hotOrange,
                      }}
                      className="flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-bold"
                    >
                      <TrendingUp className="h-3 w-3" />
                      <span>Trending</span>
                    </div>
                  )}
                </div>

                {/* Category Badge */}
                <span
                  style={{
                    backgroundColor: `${colors.moss}20`,
                    color: colors.moss,
                  }}
                  className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3"
                >
                  {resource.category}
                </span>

                {/* Title */}
                <h3 
                  style={{ color: colors.pureWhite }}
                  className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-opacity-90 transition-opacity"
                >
                  {resource.title}
                </h3>

                {/* Description */}
                <p 
                  style={{ color: colors.moss }}
                  className="text-sm mb-4 line-clamp-2 leading-relaxed"
                >
                  {resource.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {(resource.tags || []).map((tag, idx) => (
                    <span
                      key={idx}
                      style={{
                        backgroundColor: colors.eerieLight,
                        color: colors.moss,
                      }}
                      className="px-2 py-1 rounded text-xs"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Stats */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Star 
                        style={{ color: colors.orangeWheel }}
                        className="h-4 w-4 fill-current"
                      />
                      <span 
                        style={{ color: colors.pureWhite }}
                        className="text-sm font-semibold"
                      >
                        {resource.stats?.rating || 0}
                      </span>
                    </div>

                    <div className="flex items-center space-x-1">
                      <Download 
                        style={{ color: colors.moss }}
                        className="h-4 w-4"
                      />
                      <span 
                        style={{ color: colors.moss }}
                        className="text-xs"
                      >
                        {((resource.stats?.downloads || 0) / 1000).toFixed(1)}k
                      </span>
                    </div>

                    <div className="flex items-center space-x-1">
                      <Eye 
                        style={{ color: colors.moss }}
                        className="h-4 w-4"
                      />
                      <span 
                        style={{ color: colors.moss }}
                        className="text-xs"
                      >
                        {((resource.stats?.views || 0) / 1000).toFixed(1)}k
                      </span>
                    </div>
                  </div>

                  {resource.metadata?.pages > 0 && (
                    <span 
                      style={{ color: colors.moss }}
                      className="text-xs font-medium"
                    >
                      {resource.metadata.pages} pages
                    </span>
                  )}
                  {resource.metadata?.duration && (
                    <span 
                      style={{ color: colors.moss }}
                      className="text-xs font-medium"
                    >
                      {resource.metadata.duration}
                    </span>
                  )}
                </div>

                {/* Footer */}
                <div 
                  style={{ borderTopColor: `${colors.moss}20` }}
                  className="pt-4 border-t flex items-center justify-between"
                >
                  <div className="flex items-center space-x-2">
                    <div 
                      style={{
                        background: `linear-gradient(to bottom right, ${colors.hotOrange}, ${colors.orangeWheel})`,
                      }}
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
                    >
                      {resource.uploadedBy?.name?.charAt(0) || 'U'}
                    </div>
                    <div>
                      <p 
                        style={{ color: colors.pureWhite }}
                        className="text-xs font-medium"
                      >
                        {resource.uploadedBy?.name || 'Unknown'}
                      </p>
                      <div className="flex items-center space-x-1">
                        <Clock 
                          style={{ color: colors.moss }}
                          className="h-3 w-3"
                        />
                        <span 
                          style={{ color: colors.moss }}
                          className="text-xs"
                        >
                          {resource.createdAt ? new Date(resource.createdAt).toLocaleDateString() : 'Recently'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <button
                    style={{
                      background: `linear-gradient(to right, ${colors.hotOrange}, ${colors.orangeWheel})`,
                      color: colors.pureWhite,
                    }}
                    className="p-2 rounded-lg transition-all duration-200"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.1)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    <Download className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FeaturedResources;
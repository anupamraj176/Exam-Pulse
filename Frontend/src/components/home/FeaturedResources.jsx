import { useState } from 'react';
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
  Filter
} from 'lucide-react';

const FeaturedResources = () => {
  const [activeFilter, setActiveFilter] = useState('all');

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

  const resources = [
    {
      id: 1,
      title: 'Complete Indian Polity Notes',
      category: 'UPSC',
      type: 'notes',
      description: 'Comprehensive notes covering all aspects of Indian Constitution, Parliament, Judiciary, and more.',
      thumbnail: '📚',
      rating: 4.8,
      downloads: 12400,
      views: 25600,
      pages: 120,
      uploadedBy: 'Rajesh Kumar',
      uploadedTime: '2 days ago',
      trending: true,
      tags: ['Constitution', 'Parliament', 'Judiciary'],
      color: colors.hotOrange,
    },
    {
      id: 2,
      title: 'SSC CGL Mathematics PYQ (2015-2024)',
      category: 'SSC',
      type: 'pyq',
      description: 'Last 10 years solved previous year questions with detailed explanations and shortcuts.',
      thumbnail: '🔢',
      rating: 4.9,
      downloads: 18900,
      views: 34200,
      pages: 200,
      uploadedBy: 'Priya Sharma',
      uploadedTime: '1 week ago',
      trending: true,
      tags: ['Quantitative', 'Algebra', 'Geometry'],
      color: colors.orangeWheel,
    },
    {
      id: 3,
      title: 'Banking Awareness Complete Package',
      category: 'Banking',
      type: 'notes',
      description: 'Current affairs, banking terms, RBI policies, and financial awareness for bank exams.',
      thumbnail: '🏦',
      rating: 4.7,
      downloads: 9800,
      views: 18500,
      pages: 85,
      uploadedBy: 'Amit Verma',
      uploadedTime: '3 days ago',
      trending: false,
      tags: ['RBI', 'Banking Terms', 'Current Affairs'],
      color: colors.moss,
    },
    {
      id: 4,
      title: 'English Grammar Masterclass',
      category: 'All Exams',
      type: 'video',
      description: 'Complete video series covering grammar rules, vocabulary, and comprehension techniques.',
      thumbnail: '🎥',
      rating: 4.9,
      downloads: 15600,
      views: 42000,
      pages: 0,
      duration: '12 hours',
      uploadedBy: 'Sneha Gupta',
      uploadedTime: '5 days ago',
      trending: true,
      tags: ['Grammar', 'Vocabulary', 'Comprehension'],
      color: colors.hotOrange,
    },
    {
      id: 5,
      title: 'Indian Geography Complete Notes',
      category: 'UPSC',
      type: 'notes',
      description: 'Detailed notes on physical, economic, and social geography of India with maps and diagrams.',
      thumbnail: '🗺️',
      rating: 4.6,
      downloads: 8700,
      views: 16200,
      pages: 95,
      uploadedBy: 'Vikram Singh',
      uploadedTime: '1 week ago',
      trending: false,
      tags: ['Physical', 'Economic', 'Maps'],
      color: colors.moss,
    },
    {
      id: 6,
      title: 'Reasoning Shortcuts & Tricks',
      category: 'SSC',
      type: 'notes',
      description: 'Smart shortcuts for solving reasoning questions quickly in competitive exams.',
      thumbnail: '🧠',
      rating: 4.8,
      downloads: 21000,
      views: 38900,
      pages: 65,
      uploadedBy: 'Rahul Joshi',
      uploadedTime: '4 days ago',
      trending: true,
      tags: ['Shortcuts', 'Puzzles', 'Seating'],
      color: colors.orangeWheel,
    },
  ];

  const filteredResources = activeFilter === 'all' 
    ? resources 
    : resources.filter(r => r.type === activeFilter);

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredResources.map((resource) => (
            <div
              key={resource.id}
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
                      background: `linear-gradient(135deg, ${resource.color}20, ${resource.color}10)`,
                    }}
                    className="w-16 h-16 rounded-xl flex items-center justify-center text-3xl"
                  >
                    {resource.thumbnail}
                  </div>
                  
                  {resource.trending && (
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
                  {resource.tags.map((tag, idx) => (
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
                        {resource.rating}
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
                        {(resource.downloads / 1000).toFixed(1)}k
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
                        {(resource.views / 1000).toFixed(1)}k
                      </span>
                    </div>
                  </div>

                  {resource.pages > 0 && (
                    <span 
                      style={{ color: colors.moss }}
                      className="text-xs font-medium"
                    >
                      {resource.pages} pages
                    </span>
                  )}
                  {resource.duration && (
                    <span 
                      style={{ color: colors.moss }}
                      className="text-xs font-medium"
                    >
                      {resource.duration}
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
                      {resource.uploadedBy.charAt(0)}
                    </div>
                    <div>
                      <p 
                        style={{ color: colors.pureWhite }}
                        className="text-xs font-medium"
                      >
                        {resource.uploadedBy}
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
                          {resource.uploadedTime}
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
      </div>
    </div>
  );
};

export default FeaturedResources;
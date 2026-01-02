import { useState, useEffect } from 'react';
import { 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Star, 
  Clock,
  BookOpen,
  FileText,
  Video,
  CheckCircle,
  SlidersHorizontal,
  X,
  ChevronDown,
  TrendingUp,
  Calendar,
  Loader
} from 'lucide-react';
import useResourceStore from '../store/resourceStore';

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExam, setSelectedExam] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);

  const { 
    resources, 
    fetchResources, 
    searchResources,
    isLoading, 
    pagination 
  } = useResourceStore();

  // Fetch resources on mount and when filters change
  useEffect(() => {
    const params = {
      page: 1,
      limit: 20,
      ...(selectedExam !== 'all' && { category: selectedExam }),
      ...(selectedSubject !== 'all' && { subject: selectedSubject }),
      ...(selectedType !== 'all' && { type: selectedType }),
      sortBy: sortBy === 'popular' ? 'views' : sortBy === 'recent' ? 'createdAt' : sortBy,
    };
    
    if (searchQuery) {
      searchResources(searchQuery, params);
    } else {
      fetchResources(params);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedExam, selectedSubject, selectedType, sortBy, searchQuery]);

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

  const examFilters = [
    { id: 'all', name: 'All Exams' },
    { id: 'ssc', name: 'SSC' },
    { id: 'banking', name: 'Banking' },
    { id: 'railways', name: 'Railways' },
    { id: 'upsc', name: 'UPSC' },
    { id: 'state-psc', name: 'State PSC' },
    { id: 'defence', name: 'Defence' },
  ];

  const subjectFilters = [
    { id: 'all', name: 'All Subjects' },
    { id: 'math', name: 'Mathematics' },
    { id: 'reasoning', name: 'Reasoning' },
    { id: 'english', name: 'English' },
    { id: 'gk', name: 'General Knowledge' },
    { id: 'science', name: 'Science' },
    { id: 'polity', name: 'Indian Polity' },
    { id: 'history', name: 'History' },
    { id: 'geography', name: 'Geography' },
    { id: 'economy', name: 'Economy' },
  ];

  const typeFilters = [
    { id: 'all', name: 'All Types', icon: BookOpen },
    { id: 'notes', name: 'Notes', icon: FileText },
    { id: 'pyq', name: 'PYQs', icon: CheckCircle },
    { id: 'video', name: 'Videos', icon: Video },
  ];

  const sortOptions = [
    { id: 'popular', name: 'Most Popular' },
    { id: 'recent', name: 'Recently Added' },
    { id: 'rating', name: 'Highest Rated' },
    { id: 'downloads', name: 'Most Downloaded' },
  ];

  // Type icons mapping
  const typeIcons = {
    notes: '📚',
    pdf: '📄',
    pyq: '🔢',
    video: '🎥',
    ebook: '📖',
  };

  // Get color based on type
  const getResourceColor = (type) => {
    switch(type) {
      case 'notes': return colors.hotOrange;
      case 'pyq': return colors.orangeWheel;
      case 'video': return colors.hotOrange;
      default: return colors.moss;
    }
  };

  // Use API resources or fallback empty array
  const displayResources = resources || [];

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedExam('all');
    setSelectedSubject('all');
    setSelectedType('all');
    setSortBy('popular');
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
          <div className="flex items-center space-x-2 mb-4">
            <BookOpen style={{ color: colors.hotOrange }} className="h-6 w-6" />
            <span 
              style={{ color: colors.moss }}
              className="text-sm font-semibold uppercase tracking-wider"
            >
              Study Materials
            </span>
          </div>
          <h1 
            style={{ color: colors.pureWhite }}
            className="text-4xl lg:text-5xl font-display font-bold mb-4"
          >
            Resource Library
          </h1>
          <p 
            style={{ color: colors.moss }}
            className="text-lg max-w-2xl"
          >
            Access {pagination?.total || displayResources.length || 100}+ high-quality study materials, notes, and previous year questions
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Search and Filter Bar */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 mb-4">
            {/* Search Bar */}
            <div 
              style={{
                backgroundColor: colors.eerieBlack,
                borderColor: `${colors.moss}30`,
              }}
              className="flex items-center px-4 py-3 rounded-xl border-2 flex-1"
            >
              <Search style={{ color: colors.moss }} className="h-5 w-5 mr-3" />
              <input
                type="text"
                placeholder="Search by title, subject, or tags..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  backgroundColor: 'transparent',
                  color: colors.pureWhite,
                }}
                className="flex-1 outline-none text-sm placeholder-gray-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  style={{ color: colors.moss }}
                  className="hover:text-hotOrange transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              )}
            </div>

            {/* Mobile Filter Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              style={{
                backgroundColor: colors.eerieBlack,
                borderColor: `${colors.hotOrange}30`,
                color: colors.pureWhite,
              }}
              className="lg:hidden flex items-center justify-center space-x-2 px-6 py-3 rounded-xl border-2 font-semibold"
            >
              <SlidersHorizontal className="h-5 w-5" />
              <span>Filters</span>
            </button>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                style={{
                  backgroundColor: colors.eerieBlack,
                  borderColor: `${colors.moss}30`,
                  color: colors.pureWhite,
                }}
                className="appearance-none px-6 py-3 pr-10 rounded-xl border-2 font-medium text-sm outline-none cursor-pointer w-full lg:w-auto"
              >
                {sortOptions.map(option => (
                  <option key={option.id} value={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
              <ChevronDown 
                style={{ color: colors.moss }}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 pointer-events-none"
              />
            </div>
          </div>

          {/* Desktop Filters */}
          <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Exam Filter */}
              <select
                value={selectedExam}
                onChange={(e) => setSelectedExam(e.target.value)}
                style={{
                  backgroundColor: colors.eerieBlack,
                  borderColor: `${colors.moss}30`,
                  color: colors.pureWhite,
                }}
                className="appearance-none px-4 py-3 pr-10 rounded-xl border-2 text-sm outline-none cursor-pointer"
              >
                {examFilters.map(exam => (
                  <option key={exam.id} value={exam.id}>
                    {exam.name}
                  </option>
                ))}
              </select>

              {/* Subject Filter */}
              <select
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
                style={{
                  backgroundColor: colors.eerieBlack,
                  borderColor: `${colors.moss}30`,
                  color: colors.pureWhite,
                }}
                className="appearance-none px-4 py-3 pr-10 rounded-xl border-2 text-sm outline-none cursor-pointer"
              >
                {subjectFilters.map(subject => (
                  <option key={subject.id} value={subject.id}>
                    {subject.name}
                  </option>
                ))}
              </select>

              {/* Type Filter */}
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                style={{
                  backgroundColor: colors.eerieBlack,
                  borderColor: `${colors.moss}30`,
                  color: colors.pureWhite,
                }}
                className="appearance-none px-4 py-3 pr-10 rounded-xl border-2 text-sm outline-none cursor-pointer"
              >
                {typeFilters.map(type => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Active Filters Display */}
          {(searchQuery || selectedExam !== 'all' || selectedSubject !== 'all' || selectedType !== 'all') && (
            <div className="flex items-center space-x-2 mt-4">
              <span style={{ color: colors.moss }} className="text-sm">
                Active filters:
              </span>
              <button
                onClick={clearFilters}
                style={{
                  backgroundColor: `${colors.hotOrange}20`,
                  color: colors.hotOrange,
                }}
                className="px-3 py-1 rounded-lg text-xs font-semibold hover:bg-opacity-80 transition-all"
              >
                Clear All
              </button>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p style={{ color: colors.moss }} className="text-sm">
            Showing <span style={{ color: colors.pureWhite }} className="font-bold">{displayResources.length}</span> results
            {pagination?.total > 0 && ` of ${pagination.total}`}
          </p>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <Loader style={{ color: colors.hotOrange }} className="h-8 w-8 animate-spin" />
          </div>
        ) : displayResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayResources.map((resource) => (
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
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `${colors.moss}20`;
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
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

                  <span
                    style={{
                      backgroundColor: `${colors.moss}20`,
                      color: colors.moss,
                    }}
                    className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3"
                  >
                    {resource.category}
                  </span>

                  <h3 
                    style={{ color: colors.pureWhite }}
                    className="text-xl font-bold mb-2 line-clamp-2"
                  >
                    {resource.title}
                  </h3>

                  <p 
                    style={{ color: colors.moss }}
                    className="text-sm mb-4 line-clamp-2"
                  >
                    {resource.description}
                  </p>

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

                    {resource.metadata?.pages && (
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
                          <Calendar 
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
        ) : (
          <div 
            style={{
              backgroundColor: colors.eerieBlack,
              borderColor: `${colors.moss}30`,
            }}
            className="text-center py-16 rounded-2xl border-2"
          >
            <BookOpen 
              style={{ color: colors.moss }}
              className="h-16 w-16 mx-auto mb-4 opacity-50"
            />
            <h3 
              style={{ color: colors.pureWhite }}
              className="text-xl font-bold mb-2"
            >
              No Resources Found
            </h3>
            <p 
              style={{ color: colors.moss }}
              className="mb-6"
            >
              Try adjusting your filters or search query
            </p>
            <button
              onClick={clearFilters}
              style={{
                background: `linear-gradient(to right, ${colors.hotOrange}, ${colors.orangeWheel})`,
                color: colors.pureWhite,
              }}
              className="px-6 py-3 rounded-xl font-semibold"
            >
              Clear Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Resources;

import { useState } from 'react';
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
  Calendar
} from 'lucide-react';

const Resources = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExam, setSelectedExam] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedType, setSelectedType] = useState('all');
  const [sortBy, setSortBy] = useState('popular');
  const [showFilters, setShowFilters] = useState(false);

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

  const allResources = [
    {
      id: 1,
      title: 'Complete Indian Polity Notes',
      category: 'UPSC',
      subject: 'polity',
      type: 'notes',
      description: 'Comprehensive notes covering Constitution, Parliament, Judiciary.',
      thumbnail: '📚',
      rating: 4.8,
      downloads: 12400,
      views: 25600,
      pages: 120,
      uploadedBy: 'Rajesh Kumar',
      uploadedDate: '2024-12-20',
      tags: ['Constitution', 'Parliament', 'Judiciary'],
      color: colors.hotOrange,
      trending: true,
    },
    {
      id: 2,
      title: 'SSC CGL Mathematics PYQ (2015-2024)',
      category: 'SSC',
      subject: 'math',
      type: 'pyq',
      description: 'Last 10 years solved PYQ with detailed explanations.',
      thumbnail: '🔢',
      rating: 4.9,
      downloads: 18900,
      views: 34200,
      pages: 200,
      uploadedBy: 'Priya Sharma',
      uploadedDate: '2024-12-18',
      tags: ['Quantitative', 'Algebra', 'Geometry'],
      color: colors.orangeWheel,
      trending: true,
    },
    {
      id: 3,
      title: 'Banking Awareness Complete Package',
      category: 'Banking',
      subject: 'gk',
      type: 'notes',
      description: 'Current affairs, banking terms, RBI policies.',
      thumbnail: '🏦',
      rating: 4.7,
      downloads: 9800,
      views: 18500,
      pages: 85,
      uploadedBy: 'Amit Verma',
      uploadedDate: '2024-12-22',
      tags: ['RBI', 'Banking Terms', 'Current Affairs'],
      color: colors.moss,
      trending: false,
    },
    {
      id: 4,
      title: 'English Grammar Masterclass',
      category: 'All Exams',
      subject: 'english',
      type: 'video',
      description: 'Complete video series on grammar, vocabulary.',
      thumbnail: '🎥',
      rating: 4.9,
      downloads: 15600,
      views: 42000,
      duration: '12 hours',
      uploadedBy: 'Sneha Gupta',
      uploadedDate: '2024-12-15',
      tags: ['Grammar', 'Vocabulary', 'Comprehension'],
      color: colors.hotOrange,
      trending: true,
    },
    {
      id: 5,
      title: 'Indian Geography Complete Notes',
      category: 'UPSC',
      subject: 'geography',
      type: 'notes',
      description: 'Physical, economic, social geography with maps.',
      thumbnail: '🗺️',
      rating: 4.6,
      downloads: 8700,
      views: 16200,
      pages: 95,
      uploadedBy: 'Vikram Singh',
      uploadedDate: '2024-12-19',
      tags: ['Physical', 'Economic', 'Maps'],
      color: colors.moss,
      trending: false,
    },
    {
      id: 6,
      title: 'Reasoning Shortcuts & Tricks',
      category: 'SSC',
      subject: 'reasoning',
      type: 'notes',
      description: 'Smart shortcuts for solving reasoning quickly.',
      thumbnail: '🧠',
      rating: 4.8,
      downloads: 21000,
      views: 38900,
      pages: 65,
      uploadedBy: 'Rahul Joshi',
      uploadedDate: '2024-12-21',
      tags: ['Shortcuts', 'Puzzles', 'Seating'],
      color: colors.orangeWheel,
      trending: true,
    },
    {
      id: 7,
      title: 'Railway GK & Current Affairs 2024',
      category: 'Railways',
      subject: 'gk',
      type: 'notes',
      description: 'Complete GK and current affairs for railway exams.',
      thumbnail: '🚂',
      rating: 4.7,
      downloads: 11200,
      views: 21800,
      pages: 110,
      uploadedBy: 'Ankit Sharma',
      uploadedDate: '2024-12-23',
      tags: ['Current Affairs', 'Railway GK', 'Static GK'],
      color: colors.hotOrange,
      trending: false,
    },
    {
      id: 8,
      title: 'History of Modern India',
      category: 'UPSC',
      subject: 'history',
      type: 'notes',
      description: 'Complete modern India history from 1857 to independence.',
      thumbnail: '📜',
      rating: 4.8,
      downloads: 13400,
      views: 27300,
      pages: 145,
      uploadedBy: 'Meera Reddy',
      uploadedDate: '2024-12-17',
      tags: ['Modern History', 'Freedom Struggle', '1857'],
      color: colors.moss,
      trending: false,
    },
  ];

  // Filter resources
  const filteredResources = allResources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesExam = selectedExam === 'all' || resource.category.toLowerCase().includes(selectedExam);
    const matchesSubject = selectedSubject === 'all' || resource.subject === selectedSubject;
    const matchesType = selectedType === 'all' || resource.type === selectedType;
    
    return matchesSearch && matchesExam && matchesSubject && matchesType;
  });

  // Sort resources
  const sortedResources = [...filteredResources].sort((a, b) => {
    switch (sortBy) {
      case 'popular':
        return b.views - a.views;
      case 'recent':
        return new Date(b.uploadedDate) - new Date(a.uploadedDate);
      case 'rating':
        return b.rating - a.rating;
      case 'downloads':
        return b.downloads - a.downloads;
      default:
        return 0;
    }
  });

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
            Access {allResources.length}+ high-quality study materials, notes, and previous year questions
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
            Showing <span style={{ color: colors.pureWhite }} className="font-bold">{sortedResources.length}</span> results
          </p>
        </div>

        {/* Resources Grid */}
        {sortedResources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sortedResources.map((resource) => (
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

                    {resource.pages && (
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
                          <Calendar 
                            style={{ color: colors.moss }}
                            className="h-3 w-3"
                          />
                          <span 
                            style={{ color: colors.moss }}
                            className="text-xs"
                          >
                            {new Date(resource.uploadedDate).toLocaleDateString()}
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

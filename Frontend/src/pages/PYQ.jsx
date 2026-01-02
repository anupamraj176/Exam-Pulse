import { useState, useEffect } from 'react';
import { 
  FileText, 
  Download, 
  Eye, 
  Search,
  Filter,
  Calendar,
  Clock,
  CheckCircle,
  Star,
  TrendingUp,
  Award,
  BookOpen,
  X,
  ExternalLink,
  Loader
} from 'lucide-react';
import api from '../services/api';

const PYQ = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExam, setSelectedExam] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [pyqData, setPyqData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalPYQs: 0,
    totalDownloads: 0,
    totalExams: 0,
    yearsAvailable: 0
  });

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
    { id: 'SSC', name: 'SSC' },
    { id: 'Banking', name: 'Banking' },
    { id: 'Railways', name: 'Railways' },
    { id: 'UPSC', name: 'UPSC' },
    { id: 'State PSC', name: 'State PSC' },
    { id: 'Defence', name: 'Defence' },
  ];

  const yearFilters = [
    { id: 'all', name: 'All Years' },
    { id: '2024', name: '2024' },
    { id: '2023', name: '2023' },
    { id: '2022', name: '2022' },
    { id: '2021', name: '2021' },
    { id: '2020', name: '2020' },
  ];

  const subjectFilters = [
    { id: 'all', name: 'All Subjects' },
    { id: 'math', name: 'Mathematics' },
    { id: 'reasoning', name: 'Reasoning' },
    { id: 'english', name: 'English' },
    { id: 'gk', name: 'General Knowledge' },
    { id: 'computer', name: 'Computer' },
    { id: 'current-affairs', name: 'Current Affairs' },
  ];

  useEffect(() => {
    fetchPYQs();
  }, [selectedExam, selectedSubject]);

  const fetchPYQs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append('type', 'pyq');
      if (selectedExam !== 'all') params.append('category', selectedExam);
      if (selectedSubject !== 'all') params.append('subject', selectedSubject);
      
      const response = await api.get(`/resources?${params.toString()}`);
      
      if (response.data.success) {
        const resources = response.data.data.resources || [];
        setPyqData(resources);
        
        // Calculate stats
        const totalDownloads = resources.reduce((acc, r) => acc + (r.stats?.downloads || 0), 0);
        const uniqueCategories = [...new Set(resources.map(r => r.category))];
        
        setStats({
          totalPYQs: resources.length,
          totalDownloads,
          totalExams: uniqueCategories.length,
          yearsAvailable: 5
        });
      }
    } catch (error) {
      console.error('Failed to fetch PYQs:', error);
    } finally {
      setLoading(false);
    }
  };

  // Filter PYQs locally for search and year
  const filteredPYQs = pyqData.filter(pyq => {
    const matchesSearch = !searchQuery || 
      pyq.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pyq.description?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesYear = selectedYear === 'all' || pyq.year?.toString() === selectedYear;
    
    return matchesSearch && matchesYear;
  });

  const getDifficultyColor = (difficulty) => {
    switch(difficulty) {
      case 'Easy': return colors.moss;
      case 'Medium': return colors.orangeWheel;
      case 'Hard': return colors.hotOrange;
      default: return colors.moss;
    }
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedExam('all');
    setSelectedYear('all');
    setSelectedSubject('all');
  };

  const formatNumber = (num) => {
    if (!num) return '0';
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
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
            <FileText style={{ color: colors.hotOrange }} className="h-6 w-6" />
            <span 
              style={{ color: colors.moss }}
              className="text-sm font-semibold uppercase tracking-wider"
            >
              Previous Year Questions
            </span>
          </div>
          <h1 
            style={{ color: colors.pureWhite }}
            className="text-4xl lg:text-5xl font-display font-bold mb-4"
          >
            PYQ Library
          </h1>
          <p 
            style={{ color: colors.moss }}
            className="text-lg max-w-2xl"
          >
            Practice with authentic previous year questions from major government exams with detailed solutions
          </p>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
            {[
              { label: 'Total PYQs', value: stats.totalPYQs, icon: FileText },
              { label: 'Downloads', value: formatNumber(stats.totalDownloads), icon: Download },
              { label: 'Exams Covered', value: stats.totalExams, icon: Award },
              { label: 'Years Available', value: stats.yearsAvailable, icon: Calendar },
            ].map((stat, index) => (
              <div 
                key={index}
                style={{ backgroundColor: `${colors.eerieBlack}90`, borderColor: `${colors.moss}30` }}
                className="p-4 rounded-xl border-2 flex items-center space-x-3"
              >
                <div 
                  style={{ backgroundColor: `${colors.hotOrange}20` }}
                  className="p-2 rounded-lg"
                >
                  <stat.icon style={{ color: colors.hotOrange }} className="h-5 w-5" />
                </div>
                <div>
                  <p style={{ color: colors.pureWhite }} className="text-xl font-bold">
                    {stat.value}
                  </p>
                  <p style={{ color: colors.moss }} className="text-xs">
                    {stat.label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filter Toggle */}
        <div className="flex flex-col lg:flex-row lg:items-center gap-4 mb-6">
          {/* Search */}
          <div className="flex-1 relative">
            <Search 
              style={{ color: colors.moss }} 
              className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5" 
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search PYQs by name, exam, or subject..."
              style={{ 
                backgroundColor: colors.eerieBlack, 
                borderColor: `${colors.moss}30`,
                color: colors.pureWhite,
              }}
              className="w-full pl-12 pr-4 py-3 rounded-xl border-2 outline-none focus:border-opacity-60 transition-all"
            />
          </div>

          {/* Filter Toggle Button */}
          <button
            onClick={() => setShowFilters(!showFilters)}
            style={{ 
              backgroundColor: showFilters ? colors.hotOrange : colors.eerieBlack,
              borderColor: showFilters ? colors.hotOrange : `${colors.moss}30`,
            }}
            className="flex items-center space-x-2 px-4 py-3 rounded-xl border-2 font-medium transition-all"
          >
            <Filter style={{ color: showFilters ? colors.pureWhite : colors.moss }} className="h-5 w-5" />
            <span style={{ color: showFilters ? colors.pureWhite : colors.moss }}>Filters</span>
          </button>
        </div>

        {/* Expanded Filters */}
        {showFilters && (
          <div 
            style={{ backgroundColor: colors.eerieBlack, borderColor: `${colors.moss}30` }}
            className="rounded-2xl border-2 p-6 mb-6"
          >
            <div className="flex flex-col lg:flex-row lg:items-end gap-6">
              {/* Exam Filter */}
              <div className="flex-1">
                <label style={{ color: colors.moss }} className="block text-sm font-medium mb-2">
                  Exam Category
                </label>
                <select
                  value={selectedExam}
                  onChange={(e) => setSelectedExam(e.target.value)}
                  style={{ 
                    backgroundColor: colors.night, 
                    borderColor: `${colors.moss}30`,
                    color: colors.pureWhite,
                  }}
                  className="w-full px-4 py-3 rounded-xl border-2 outline-none"
                >
                  {examFilters.map(filter => (
                    <option key={filter.id} value={filter.id}>{filter.name}</option>
                  ))}
                </select>
              </div>

              {/* Year Filter */}
              <div className="flex-1">
                <label style={{ color: colors.moss }} className="block text-sm font-medium mb-2">
                  Year
                </label>
                <select
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(e.target.value)}
                  style={{ 
                    backgroundColor: colors.night, 
                    borderColor: `${colors.moss}30`,
                    color: colors.pureWhite,
                  }}
                  className="w-full px-4 py-3 rounded-xl border-2 outline-none"
                >
                  {yearFilters.map(filter => (
                    <option key={filter.id} value={filter.id}>{filter.name}</option>
                  ))}
                </select>
              </div>

              {/* Subject Filter */}
              <div className="flex-1">
                <label style={{ color: colors.moss }} className="block text-sm font-medium mb-2">
                  Subject
                </label>
                <select
                  value={selectedSubject}
                  onChange={(e) => setSelectedSubject(e.target.value)}
                  style={{ 
                    backgroundColor: colors.night, 
                    borderColor: `${colors.moss}30`,
                    color: colors.pureWhite,
                  }}
                  className="w-full px-4 py-3 rounded-xl border-2 outline-none"
                >
                  {subjectFilters.map(filter => (
                    <option key={filter.id} value={filter.id}>{filter.name}</option>
                  ))}
                </select>
              </div>

              {/* Clear Filters */}
              <button
                onClick={clearFilters}
                style={{ backgroundColor: `${colors.hotOrange}20` }}
                className="px-6 py-3 rounded-xl flex items-center space-x-2"
              >
                <X style={{ color: colors.hotOrange }} className="h-5 w-5" />
                <span style={{ color: colors.hotOrange }}>Clear</span>
              </button>
            </div>
          </div>
        )}

        {/* Results Count */}
        <div className="flex items-center justify-between mb-6">
          <p style={{ color: colors.moss }}>
            Showing <span style={{ color: colors.pureWhite }} className="font-bold">{filteredPYQs.length}</span> results
          </p>
        </div>

        {/* Loading State */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader style={{ color: colors.hotOrange }} className="h-10 w-10 animate-spin" />
          </div>
        ) : filteredPYQs.length === 0 ? (
          <div 
            style={{ backgroundColor: colors.eerieBlack, borderColor: `${colors.moss}30` }}
            className="rounded-2xl border-2 p-12 text-center"
          >
            <FileText style={{ color: colors.moss }} className="h-16 w-16 mx-auto mb-4 opacity-50" />
            <h2 style={{ color: colors.pureWhite }} className="text-xl font-bold mb-2">
              No PYQs Found
            </h2>
            <p style={{ color: colors.moss }} className="mb-4">
              {searchQuery || selectedExam !== 'all' || selectedYear !== 'all' || selectedSubject !== 'all'
                ? 'Try adjusting your filters or search query'
                : 'No previous year questions have been uploaded yet'
              }
            </p>
            <button
              onClick={clearFilters}
              style={{ backgroundColor: colors.hotOrange }}
              className="px-6 py-3 rounded-xl text-white font-semibold"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          /* PYQ Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPYQs.map((pyq) => (
              <div
                key={pyq._id}
                style={{ 
                  backgroundColor: colors.eerieBlack, 
                  borderColor: `${colors.moss}30`,
                }}
                className="rounded-2xl border-2 overflow-hidden hover:border-opacity-60 transition-all group"
              >
                {/* Header */}
                <div 
                  style={{ 
                    background: `linear-gradient(135deg, ${colors.night} 0%, ${colors.eerieBlack} 100%)`,
                  }}
                  className="p-5 border-b"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <span 
                        style={{ backgroundColor: colors.hotOrange }}
                        className="px-2 py-1 rounded-lg text-white text-xs font-bold"
                      >
                        {pyq.category}
                      </span>
                      {pyq.isTrending && (
                        <span 
                          style={{ backgroundColor: `${colors.moss}20`, color: colors.moss }}
                          className="px-2 py-1 rounded-lg text-xs font-medium flex items-center space-x-1"
                        >
                          <TrendingUp className="h-3 w-3" />
                          <span>Trending</span>
                        </span>
                      )}
                    </div>
                    {pyq.year && (
                      <span 
                        style={{ backgroundColor: `${colors.orangeWheel}20`, color: colors.orangeWheel }}
                        className="px-2 py-1 rounded-lg text-xs font-bold"
                      >
                        {pyq.year}
                      </span>
                    )}
                  </div>

                  <h3 
                    style={{ color: colors.pureWhite }}
                    className="font-bold text-lg mb-1 line-clamp-2"
                  >
                    {pyq.title}
                  </h3>
                  <p style={{ color: colors.moss }} className="text-sm line-clamp-1">
                    {pyq.subject} {pyq.shift ? `• ${pyq.shift}` : ''}
                  </p>
                </div>

                {/* Stats */}
                <div className="p-5">
                  <div className="grid grid-cols-3 gap-3 mb-4">
                    <div className="text-center">
                      <p style={{ color: colors.pureWhite }} className="font-bold">
                        {pyq.pages || pyq.totalQuestions || '—'}
                      </p>
                      <p style={{ color: colors.moss }} className="text-xs">
                        {pyq.pages ? 'Pages' : 'Questions'}
                      </p>
                    </div>
                    <div className="text-center">
                      <p style={{ color: colors.pureWhite }} className="font-bold">
                        {formatNumber(pyq.stats?.downloads || 0)}
                      </p>
                      <p style={{ color: colors.moss }} className="text-xs">Downloads</p>
                    </div>
                    <div className="text-center">
                      <p style={{ color: colors.pureWhite }} className="font-bold flex items-center justify-center space-x-1">
                        <Star style={{ color: colors.orangeWheel }} className="h-3 w-3 fill-current" />
                        <span>{pyq.rating?.average?.toFixed(1) || '4.5'}</span>
                      </p>
                      <p style={{ color: colors.moss }} className="text-xs">Rating</p>
                    </div>
                  </div>

                  {/* Tags */}
                  {pyq.tags && pyq.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {pyq.tags.slice(0, 3).map((tag, index) => (
                        <span
                          key={index}
                          style={{ backgroundColor: `${colors.moss}20`, color: colors.moss }}
                          className="px-2 py-1 rounded-lg text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center space-x-2">
                    {pyq.fileUrl && (
                      <a
                        href={pyq.fileUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ background: `linear-gradient(to right, ${colors.hotOrange}, ${colors.orangeWheel})` }}
                        className="flex-1 py-3 rounded-xl text-white font-semibold flex items-center justify-center space-x-2"
                      >
                        <Eye className="h-4 w-4" />
                        <span>View PDF</span>
                      </a>
                    )}
                    <a
                      href={pyq.fileUrl}
                      download
                      style={{ backgroundColor: `${colors.moss}20`, borderColor: `${colors.moss}30` }}
                      className="p-3 rounded-xl border-2"
                    >
                      <Download style={{ color: colors.moss }} className="h-5 w-5" />
                    </a>
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

export default PYQ;

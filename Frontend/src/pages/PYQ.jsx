import { useState } from 'react';
import { 
  FileText, 
  Download, 
  Eye, 
  Search,
  Filter,
  ChevronDown,
  Calendar,
  Clock,
  CheckCircle,
  Star,
  TrendingUp,
  Award,
  BookOpen,
  X,
  ExternalLink
} from 'lucide-react';

const PYQ = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExam, setSelectedExam] = useState('all');
  const [selectedYear, setSelectedYear] = useState('all');
  const [selectedSubject, setSelectedSubject] = useState('all');
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
    { id: 'ssc-cgl', name: 'SSC CGL' },
    { id: 'ssc-chsl', name: 'SSC CHSL' },
    { id: 'ibps-po', name: 'IBPS PO' },
    { id: 'ibps-clerk', name: 'IBPS Clerk' },
    { id: 'sbi-po', name: 'SBI PO' },
    { id: 'rrb-ntpc', name: 'RRB NTPC' },
    { id: 'upsc-cse', name: 'UPSC CSE' },
  ];

  const yearFilters = [
    { id: 'all', name: 'All Years' },
    { id: '2024', name: '2024' },
    { id: '2023', name: '2023' },
    { id: '2022', name: '2022' },
    { id: '2021', name: '2021' },
    { id: '2020', name: '2020' },
    { id: '2019', name: '2019' },
    { id: '2018', name: '2018' },
    { id: '2017', name: '2017' },
    { id: '2016', name: '2016' },
    { id: '2015', name: '2015' },
  ];

  const subjectFilters = [
    { id: 'all', name: 'All Subjects' },
    { id: 'math', name: 'Mathematics' },
    { id: 'reasoning', name: 'Reasoning' },
    { id: 'english', name: 'English' },
    { id: 'gk', name: 'General Knowledge' },
    { id: 'computer', name: 'Computer' },
  ];

  const pyqData = [
    {
      id: 1,
      exam: 'SSC CGL',
      examId: 'ssc-cgl',
      year: 2024,
      subject: 'Mathematics',
      subjectId: 'math',
      shift: 'Tier 1 - All Shifts',
      totalQuestions: 100,
      duration: '60 minutes',
      downloads: 15400,
      views: 28900,
      rating: 4.8,
      solutions: true,
      language: ['English', 'Hindi'],
      uploadDate: '2024-12-20',
      trending: true,
      difficulty: 'Medium',
    },
    {
      id: 2,
      exam: 'SSC CGL',
      examId: 'ssc-cgl',
      year: 2023,
      subject: 'Reasoning',
      subjectId: 'reasoning',
      shift: 'Tier 1 - Shift 1',
      totalQuestions: 75,
      duration: '60 minutes',
      downloads: 12800,
      views: 24500,
      rating: 4.7,
      solutions: true,
      language: ['English', 'Hindi'],
      uploadDate: '2024-11-15',
      trending: true,
      difficulty: 'Medium',
    },
    {
      id: 3,
      exam: 'IBPS PO',
      examId: 'ibps-po',
      year: 2024,
      subject: 'English',
      subjectId: 'english',
      shift: 'Prelims',
      totalQuestions: 30,
      duration: '20 minutes',
      downloads: 9800,
      views: 18200,
      rating: 4.6,
      solutions: true,
      language: ['English'],
      uploadDate: '2024-12-10',
      trending: false,
      difficulty: 'Easy',
    },
    {
      id: 4,
      exam: 'SBI PO',
      examId: 'sbi-po',
      year: 2023,
      subject: 'Mathematics',
      subjectId: 'math',
      shift: 'Prelims',
      totalQuestions: 35,
      duration: '20 minutes',
      downloads: 11200,
      views: 21600,
      rating: 4.9,
      solutions: true,
      language: ['English', 'Hindi'],
      uploadDate: '2024-10-25',
      trending: false,
      difficulty: 'Hard',
    },
    {
      id: 5,
      exam: 'RRB NTPC',
      examId: 'rrb-ntpc',
      year: 2024,
      subject: 'General Knowledge',
      subjectId: 'gk',
      shift: 'All Shifts',
      totalQuestions: 100,
      duration: '90 minutes',
      downloads: 18900,
      views: 34200,
      rating: 4.8,
      solutions: true,
      language: ['English', 'Hindi'],
      uploadDate: '2024-12-01',
      trending: true,
      difficulty: 'Medium',
    },
    {
      id: 6,
      exam: 'SSC CHSL',
      examId: 'ssc-chsl',
      year: 2023,
      subject: 'English',
      subjectId: 'english',
      shift: 'Tier 1 - All Shifts',
      totalQuestions: 100,
      duration: '60 minutes',
      downloads: 13400,
      views: 25800,
      rating: 4.7,
      solutions: true,
      language: ['English', 'Hindi'],
      uploadDate: '2024-11-20',
      trending: false,
      difficulty: 'Easy',
    },
    {
      id: 7,
      exam: 'IBPS Clerk',
      examId: 'ibps-clerk',
      year: 2024,
      subject: 'Reasoning',
      subjectId: 'reasoning',
      shift: 'Prelims',
      totalQuestions: 35,
      duration: '20 minutes',
      downloads: 10500,
      views: 19800,
      rating: 4.6,
      solutions: true,
      language: ['English', 'Hindi'],
      uploadDate: '2024-12-05',
      trending: false,
      difficulty: 'Medium',
    },
    {
      id: 8,
      exam: 'SSC CGL',
      examId: 'ssc-cgl',
      year: 2022,
      subject: 'General Knowledge',
      subjectId: 'gk',
      shift: 'Tier 1 - All Shifts',
      totalQuestions: 100,
      duration: '60 minutes',
      downloads: 16700,
      views: 31200,
      rating: 4.9,
      solutions: true,
      language: ['English', 'Hindi'],
      uploadDate: '2024-09-10',
      trending: true,
      difficulty: 'Hard',
    },
  ];

  // Filter PYQs
  const filteredPYQs = pyqData.filter(pyq => {
    const matchesSearch = pyq.exam.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         pyq.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesExam = selectedExam === 'all' || pyq.examId === selectedExam;
    const matchesYear = selectedYear === 'all' || pyq.year.toString() === selectedYear;
    const matchesSubject = selectedSubject === 'all' || pyq.subjectId === selectedSubject;
    
    return matchesSearch && matchesExam && matchesYear && matchesSubject;
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
            <div 
              style={{
                backgroundColor: `${colors.eerieBlack}80`,
                backdropFilter: 'blur(10px)',
              }}
              className="p-4 rounded-xl"
            >
              <FileText style={{ color: colors.hotOrange }} className="h-6 w-6 mb-2" />
              <p style={{ color: colors.pureWhite }} className="text-2xl font-bold">500+</p>
              <p style={{ color: colors.moss }} className="text-sm">Question Papers</p>
            </div>
            <div 
              style={{
                backgroundColor: `${colors.eerieBlack}80`,
                backdropFilter: 'blur(10px)',
              }}
              className="p-4 rounded-xl"
            >
              <CheckCircle style={{ color: colors.orangeWheel }} className="h-6 w-6 mb-2" />
              <p style={{ color: colors.pureWhite }} className="text-2xl font-bold">100%</p>
              <p style={{ color: colors.moss }} className="text-sm">With Solutions</p>
            </div>
            <div 
              style={{
                backgroundColor: `${colors.eerieBlack}80`,
                backdropFilter: 'blur(10px)',
              }}
              className="p-4 rounded-xl"
            >
              <Award style={{ color: colors.moss }} className="h-6 w-6 mb-2" />
              <p style={{ color: colors.pureWhite }} className="text-2xl font-bold">15+</p>
              <p style={{ color: colors.moss }} className="text-sm">Major Exams</p>
            </div>
            <div 
              style={{
                backgroundColor: `${colors.eerieBlack}80`,
                backdropFilter: 'blur(10px)',
              }}
              className="p-4 rounded-xl"
            >
              <Download style={{ color: colors.hotOrange }} className="h-6 w-6 mb-2" />
              <p style={{ color: colors.pureWhite }} className="text-2xl font-bold">50k+</p>
              <p style={{ color: colors.moss }} className="text-sm">Downloads</p>
            </div>
          </div>
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
                placeholder="Search by exam or subject..."
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
              <Filter className="h-5 w-5" />
              <span>Filters</span>
            </button>
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

              {/* Year Filter */}
              <select
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
                style={{
                  backgroundColor: colors.eerieBlack,
                  borderColor: `${colors.moss}30`,
                  color: colors.pureWhite,
                }}
                className="appearance-none px-4 py-3 pr-10 rounded-xl border-2 text-sm outline-none cursor-pointer"
              >
                {yearFilters.map(year => (
                  <option key={year.id} value={year.id}>
                    {year.name}
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
            </div>
          </div>

          {/* Active Filters */}
          {(searchQuery || selectedExam !== 'all' || selectedYear !== 'all' || selectedSubject !== 'all') && (
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
            Showing <span style={{ color: colors.pureWhite }} className="font-bold">{filteredPYQs.length}</span> question papers
          </p>
        </div>

        {/* PYQ Grid */}
        {filteredPYQs.length > 0 ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredPYQs.map((pyq) => (
              <div
                key={pyq.id}
                style={{
                  backgroundColor: colors.eerieBlack,
                  borderColor: `${colors.moss}20`,
                }}
                className="rounded-2xl border-2 p-6 transition-all duration-300 group hover:shadow-2xl"
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = colors.hotOrange;
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `${colors.moss}20`;
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <h3 
                        style={{ color: colors.pureWhite }}
                        className="text-xl font-bold"
                      >
                        {pyq.exam} {pyq.year}
                      </h3>
                      {pyq.trending && (
                        <div 
                          style={{
                            backgroundColor: `${colors.hotOrange}20`,
                            color: colors.hotOrange,
                          }}
                          className="flex items-center space-x-1 px-2 py-0.5 rounded-full text-xs font-bold"
                        >
                          <TrendingUp className="h-3 w-3" />
                          <span>Trending</span>
                        </div>
                      )}
                    </div>
                    <p 
                      style={{ color: colors.moss }}
                      className="text-sm"
                    >
                      {pyq.shift}
                    </p>
                  </div>

                  <div 
                    style={{
                      background: `linear-gradient(135deg, ${colors.hotOrange}20, ${colors.orangeWheel}20)`,
                    }}
                    className="px-3 py-2 rounded-xl text-center"
                  >
                    <p 
                      style={{ color: colors.hotOrange }}
                      className="text-2xl font-bold leading-none"
                    >
                      {pyq.year}
                    </p>
                  </div>
                </div>

                {/* Subject Badge */}
                <div className="flex items-center space-x-2 mb-4">
                  <span
                    style={{
                      backgroundColor: `${getDifficultyColor(pyq.difficulty)}20`,
                      color: getDifficultyColor(pyq.difficulty),
                    }}
                    className="px-3 py-1 rounded-full text-xs font-semibold"
                  >
                    {pyq.subject}
                  </span>
                  <span
                    style={{
                      backgroundColor: `${colors.moss}20`,
                      color: colors.moss,
                    }}
                    className="px-3 py-1 rounded-full text-xs font-semibold"
                  >
                    {pyq.difficulty}
                  </span>
                  {pyq.solutions && (
                    <div className="flex items-center space-x-1">
                      <CheckCircle 
                        style={{ color: colors.moss }}
                        className="h-4 w-4"
                      />
                      <span 
                        style={{ color: colors.moss }}
                        className="text-xs font-medium"
                      >
                        With Solutions
                      </span>
                    </div>
                  )}
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <BookOpen 
                        style={{ color: colors.orangeWheel }}
                        className="h-4 w-4"
                      />
                      <span 
                        style={{ color: colors.moss }}
                        className="text-xs"
                      >
                        Questions
                      </span>
                    </div>
                    <p 
                      style={{ color: colors.pureWhite }}
                      className="text-lg font-bold"
                    >
                      {pyq.totalQuestions}
                    </p>
                  </div>

                  <div>
                    <div className="flex items-center space-x-2 mb-1">
                      <Clock 
                        style={{ color: colors.orangeWheel }}
                        className="h-4 w-4"
                      />
                      <span 
                        style={{ color: colors.moss }}
                        className="text-xs"
                      >
                        Duration
                      </span>
                    </div>
                    <p 
                      style={{ color: colors.pureWhite }}
                      className="text-lg font-bold"
                    >
                      {pyq.duration}
                    </p>
                  </div>
                </div>

                {/* Languages */}
                <div className="flex items-center space-x-2 mb-4">
                  <span 
                    style={{ color: colors.moss }}
                    className="text-xs"
                  >
                    Available in:
                  </span>
                  {pyq.language.map((lang, idx) => (
                    <span
                      key={idx}
                      style={{
                        backgroundColor: colors.eerieLight,
                        color: colors.moss,
                      }}
                      className="px-2 py-0.5 rounded text-xs"
                    >
                      {lang}
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
                        {pyq.rating}
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
                        {(pyq.downloads / 1000).toFixed(1)}k
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
                        {(pyq.views / 1000).toFixed(1)}k
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1">
                    <Calendar 
                      style={{ color: colors.moss }}
                      className="h-3 w-3"
                    />
                    <span 
                      style={{ color: colors.moss }}
                      className="text-xs"
                    >
                      {new Date(pyq.uploadDate).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center space-x-3">
                  <button
                    style={{
                      background: `linear-gradient(to right, ${colors.hotOrange}, ${colors.orangeWheel})`,
                      color: colors.pureWhite,
                    }}
                    className="flex-1 py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all duration-200"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.02)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)';
                    }}
                  >
                    <Download className="h-5 w-5" />
                    <span>Download PDF</span>
                  </button>

                  <button
                    style={{
                      backgroundColor: colors.smokyBlack,
                      borderColor: `${colors.moss}30`,
                      color: colors.moss,
                    }}
                    className="p-3 rounded-xl border-2 transition-all duration-200"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = colors.hotOrange;
                      e.currentTarget.style.color = colors.hotOrange;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = `${colors.moss}30`;
                      e.currentTarget.style.color = colors.moss;
                    }}
                  >
                    <ExternalLink className="h-5 w-5" />
                  </button>
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
            <FileText 
              style={{ color: colors.moss }}
              className="h-16 w-16 mx-auto mb-4 opacity-50"
            />
            <h3 
              style={{ color: colors.pureWhite }}
              className="text-xl font-bold mb-2"
            >
              No Question Papers Found
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

export default PYQ;

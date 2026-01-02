import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Users, 
  BookOpen, 
  FileText, 
  TrendingUp,
  ChevronRight,
  Zap,
  Clock,
  Loader
} from 'lucide-react';
import useExamStore from '../../store/examStore';

const ExamCategories = () => {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const { categories, fetchCategories, isLoading } = useExamStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

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

  // Get gradient based on index
  const getGradient = (index) => {
    const gradients = [
      `linear-gradient(135deg, ${colors.hotOrange}, ${colors.orangeWheel})`,
      `linear-gradient(135deg, ${colors.moss}, #7A8F5E)`,
      `linear-gradient(135deg, ${colors.orangeWheel}, #D96A08)`,
      `linear-gradient(135deg, ${colors.hotOrange}, ${colors.moss})`,
      `linear-gradient(135deg, #8A9B6D, ${colors.moss})`,
      `linear-gradient(135deg, ${colors.orangeWheel}, ${colors.hotOrange})`,
    ];
    return gradients[index % gradients.length];
  };

  // Get icon based on category name
  const getCategoryIcon = (name) => {
    const icons = {
      'SSC': '📋',
      'Banking': '🏦',
      'Railways': '🚂',
      'UPSC': '🎯',
      'State PSC': '🏛️',
      'Defence': '⚔️',
      'Teaching': '📚',
      'Engineering': '⚙️',
      'Medical': '🏥',
    };
    return icons[name] || '📝';
  };

  // Fallback categories if API returns empty
  const fallbackCategories = [
    {
      _id: 'ssc',
      name: 'SSC',
      fullName: 'Staff Selection Commission',
      description: 'Central government job exams for various posts',
      exams: ['CGL', 'CHSL', 'MTS', 'CPO', 'GD', 'JE', 'Steno'],
      stats: { students: 2341, materials: 1250, pyq: 450 },
      isTrending: true,
    },
    {
      _id: 'banking',
      name: 'Banking',
      fullName: 'Bank & Insurance Exams',
      description: 'Public & private sector banking jobs',
      exams: ['SBI PO', 'SBI Clerk', 'IBPS PO', 'IBPS Clerk', 'RBI', 'NABARD'],
      stats: { students: 1876, materials: 980, pyq: 380 },
      isTrending: true,
    },
    {
      _id: 'railways',
      name: 'Railways',
      fullName: 'Railway Recruitment Board',
      description: 'Indian Railways job opportunities',
      exams: ['RRB NTPC', 'RRB Group D', 'RRB JE', 'RRB ALP', 'RPF'],
      stats: { students: 1654, materials: 850, pyq: 320 },
      isTrending: false,
    },
    {
      _id: 'upsc',
      name: 'UPSC',
      fullName: 'Union Public Service Commission',
      description: 'Civil services & central government posts',
      exams: ['IAS', 'IPS', 'IFS', 'CDS', 'CAPF', 'NDA', 'ESE'],
      stats: { students: 3421, materials: 2100, pyq: 680 },
      isTrending: true,
    },
    {
      _id: 'state-psc',
      name: 'State PSC',
      fullName: 'State Public Service Commission',
      description: 'State government job examinations',
      exams: ['BPSC', 'UPPSC', 'MPPSC', 'RPSC', 'WBPSC', 'TNPSC'],
      stats: { students: 1234, materials: 920, pyq: 290 },
      isTrending: false,
    },
    {
      _id: 'defence',
      name: 'Defence',
      fullName: 'Defence & Paramilitary Forces',
      description: 'Armed forces & paramilitary recruitment',
      exams: ['CDS', 'NDA', 'AFCAT', 'Indian Navy', 'Indian Army', 'IAF'],
      stats: { students: 987, materials: 670, pyq: 210 },
      isTrending: false,
    },
  ];

  // Use API data or fallback - with safety check
  const examCategories = (categories && categories.length > 0) ? categories : fallbackCategories;

  return (
    <div 
      style={{ backgroundColor: colors.smokyBlack }}
      className="py-16 lg:py-24 relative overflow-hidden"
    >
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div 
          style={{
            background: `radial-gradient(circle at 10% 20%, ${colors.hotOrange}08 0%, transparent 50%)`,
          }}
          className="absolute top-0 left-0 w-96 h-96 blur-3xl"
        ></div>
        <div 
          style={{
            background: `radial-gradient(circle at 90% 80%, ${colors.moss}08 0%, transparent 50%)`,
          }}
          className="absolute bottom-0 right-0 w-96 h-96 blur-3xl"
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 mb-4">
            <Zap style={{ color: colors.hotOrange }} className="h-6 w-6" />
            <span 
              style={{ color: colors.moss }}
              className="text-sm font-semibold uppercase tracking-wider"
            >
              Popular Exam Categories
            </span>
          </div>
          <h2 
            style={{ color: colors.pureWhite }}
            className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-4"
          >
            Choose Your Exam Path
          </h2>
          <p 
            style={{ color: colors.moss }}
            className="text-lg max-w-2xl mx-auto"
          >
            Access comprehensive study materials, previous year questions, and join thousands of students preparing for their dream jobs
          </p>
        </div>

        {/* Categories Grid */}
        {isLoading ? (
          <div className="flex justify-center items-center py-16">
            <Loader style={{ color: colors.hotOrange }} className="h-8 w-8 animate-spin" />
          </div>
        ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {examCategories.map((category, index) => (
            <Link
              key={category._id || category.id}
              to={`/exams/${category.slug || category._id || category.name.toLowerCase().replace(/\s+/g, '-')}`}
              style={{
                backgroundColor: colors.eerieBlack,
                borderColor: hoveredIndex === index ? colors.hotOrange : `${colors.moss}30`,
              }}
              className="rounded-2xl border-2 overflow-hidden transition-all duration-300 group"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onMouseMove={(e) => {
                if (hoveredIndex === index) {
                  e.currentTarget.style.transform = 'translateY(-8px)';
                  e.currentTarget.style.boxShadow = `0 20px 60px ${colors.hotOrange}30`;
                }
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Card Header with Gradient */}
              <div 
                style={{ background: getGradient(index) }}
                className="p-6 relative overflow-hidden"
              >
                {/* Trending Badge */}
                {category.isTrending && (
                  <div 
                    style={{
                      backgroundColor: colors.pureWhite,
                      color: colors.hotOrange,
                    }}
                    className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-bold flex items-center space-x-1"
                  >
                    <TrendingUp className="h-3 w-3" />
                    <span>Trending</span>
                  </div>
                )}

                <div className="flex items-start justify-between mb-4">
                  <div className="text-6xl">{getCategoryIcon(category.name)}</div>
                  <ChevronRight 
                    style={{ color: colors.pureWhite }}
                    className="h-6 w-6 transform group-hover:translate-x-1 transition-transform duration-300"
                  />
                </div>

                <h3 
                  style={{ color: colors.pureWhite }}
                  className="text-2xl font-bold mb-1"
                >
                  {category.name}
                </h3>
                <p 
                  style={{ color: `${colors.pureWhite}E6` }}
                  className="text-sm font-medium"
                >
                  {category.fullName}
                </p>
              </div>

              {/* Card Body */}
              <div className="p-6">
                <p 
                  style={{ color: colors.moss }}
                  className="text-sm mb-4 leading-relaxed"
                >
                  {category.description}
                </p>

                {/* Exam List */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {(category.exams || []).slice(0, 4).map((exam, idx) => (
                    <span
                      key={idx}
                      style={{
                        backgroundColor: `${colors.moss}20`,
                        color: colors.moss,
                      }}
                      className="px-3 py-1 rounded-full text-xs font-medium"
                    >
                      {typeof exam === 'object' ? exam.name : exam}
                    </span>
                  ))}
                  {(category.exams || []).length > 4 && (
                    <span
                      style={{
                        backgroundColor: `${colors.hotOrange}20`,
                        color: colors.hotOrange,
                      }}
                      className="px-3 py-1 rounded-full text-xs font-medium"
                    >
                      +{category.exams.length - 4} more
                    </span>
                  )}
                </div>

                {/* Stats */}
                <div 
                  style={{ 
                    borderTopColor: `${colors.moss}20`,
                  }}
                  className="grid grid-cols-3 gap-4 pt-4 border-t"
                >
                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <Users 
                        style={{ color: colors.hotOrange }}
                        className="h-4 w-4"
                      />
                    </div>
                    <p 
                      style={{ color: colors.pureWhite }}
                      className="text-lg font-bold"
                    >
                      {(category.stats?.students || 0).toLocaleString()}
                    </p>
                    <p 
                      style={{ color: colors.moss }}
                      className="text-xs"
                    >
                      Students
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <BookOpen 
                        style={{ color: colors.orangeWheel }}
                        className="h-4 w-4"
                      />
                    </div>
                    <p 
                      style={{ color: colors.pureWhite }}
                      className="text-lg font-bold"
                    >
                      {category.stats?.materials || 0}
                    </p>
                    <p 
                      style={{ color: colors.moss }}
                      className="text-xs"
                    >
                      Materials
                    </p>
                  </div>

                  <div className="text-center">
                    <div className="flex items-center justify-center mb-1">
                      <FileText 
                        style={{ color: colors.moss }}
                        className="h-4 w-4"
                      />
                    </div>
                    <p 
                      style={{ color: colors.pureWhite }}
                      className="text-lg font-bold"
                    >
                      {category.stats?.pyq || 0}
                    </p>
                    <p 
                      style={{ color: colors.moss }}
                      className="text-xs"
                    >
                      PYQs
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
        )}

        {/* Bottom CTA */}
        <div 
          style={{
            backgroundColor: colors.eerieBlack,
            borderColor: `${colors.hotOrange}30`,
          }}
          className="text-center p-8 rounded-2xl border-2"
        >
          <Clock 
            style={{ color: colors.hotOrange }}
            className="h-12 w-12 mx-auto mb-4"
          />
          <h3 
            style={{ color: colors.pureWhite }}
            className="text-2xl font-bold mb-3"
          >
            Can't Find Your Exam?
          </h3>
          <p 
            style={{ color: colors.moss }}
            className="mb-6 max-w-2xl mx-auto"
          >
            We're constantly adding new exam categories and study materials. Let us know what you're looking for!
          </p>
          <button
            style={{
              background: `linear-gradient(to right, ${colors.hotOrange}, ${colors.orangeWheel})`,
              color: colors.pureWhite,
            }}
            className="px-8 py-3 rounded-xl font-semibold transition-all duration-200 inline-flex items-center space-x-2"
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = `0 10px 30px ${colors.hotOrange}50`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <span>Request New Category</span>
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExamCategories;
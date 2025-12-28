import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { 
  Search, 
  TrendingUp, 
  Users, 
  BookOpen, 
  Award,
  ArrowRight,
  Sparkles,
  Target
} from 'lucide-react';

const HeroSection = () => {
  const [liveUsers, setLiveUsers] = useState(1234);
  const [activeStudents, setActiveStudents] = useState(567);
  const [searchQuery, setSearchQuery] = useState('');

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

  // Simulate live user count updates
  useEffect(() => {
    const interval = setInterval(() => {
      setLiveUsers(prev => prev + Math.floor(Math.random() * 5));
      setActiveStudents(prev => prev + Math.floor(Math.random() * 3));
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const quickAccessCategories = [
    { 
      name: 'SSC CGL', 
      icon: '📋', 
      path: '/exams/ssc/cgl',
      students: 2341,
      color: colors.hotOrange 
    },
    { 
      name: 'Banking', 
      icon: '🏦', 
      path: '/exams/banking',
      students: 1876,
      color: colors.orangeWheel 
    },
    { 
      name: 'UPSC', 
      icon: '🎯', 
      path: '/exams/upsc',
      students: 3421,
      color: colors.moss 
    },
    { 
      name: 'Railways', 
      icon: '🚂', 
      path: '/exams/railways',
      students: 1654,
      color: colors.hotOrange 
    },
  ];

  const stats = [
    { label: 'Study Materials', value: '10,000+', icon: BookOpen },
    { label: 'Active Students', value: activeStudents.toLocaleString(), icon: Users },
    { label: 'Success Stories', value: '5,000+', icon: Award },
  ];

  return (
    <div 
      style={{ 
        background: `linear-gradient(135deg, ${colors.smokyBlack} 0%, ${colors.night} 50%, ${colors.eerieBlack} 100%)`,
        position: 'relative',
        overflow: 'hidden',
      }}
      className="pt-24 lg:pt-32 pb-16 lg:pb-24"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          style={{
            background: `radial-gradient(circle at 20% 50%, ${colors.hotOrange}15 0%, transparent 50%)`,
          }}
          className="absolute top-0 left-0 w-96 h-96 blur-3xl"
        ></div>
        <div 
          style={{
            background: `radial-gradient(circle at 80% 50%, ${colors.orangeWheel}10 0%, transparent 50%)`,
          }}
          className="absolute bottom-0 right-0 w-96 h-96 blur-3xl"
        ></div>
        <div 
          style={{
            background: `radial-gradient(circle at 50% 50%, ${colors.moss}08 0%, transparent 50%)`,
          }}
          className="absolute top-1/2 left-1/2 w-96 h-96 blur-3xl transform -translate-x-1/2 -translate-y-1/2"
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Live Status Badge */}
        <div className="flex justify-center mb-6 animate-fade-in">
          <div 
            style={{
              backgroundColor: colors.eerieBlack,
              borderColor: `${colors.hotOrange}40`,
            }}
            className="inline-flex items-center space-x-2 px-4 py-2 rounded-full border-2"
          >
            <div className="flex items-center space-x-2">
              <div 
                style={{ backgroundColor: colors.hotOrange }}
                className="h-2 w-2 rounded-full animate-pulse"
              ></div>
              <span style={{ color: colors.pureWhite }} className="text-sm font-medium">
                {liveUsers.toLocaleString()} students online now
              </span>
            </div>
            <TrendingUp style={{ color: colors.moss }} className="h-4 w-4" />
          </div>
        </div>

        {/* Main Hero Content */}
        <div className="text-center max-w-4xl mx-auto mb-12">
          <h1 
            style={{ color: colors.pureWhite }}
            className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-6 leading-tight"
          >
            Your Ultimate Hub for{' '}
            <span 
              style={{
                background: `linear-gradient(to right, ${colors.hotOrange}, ${colors.orangeWheel})`,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Government Exams
            </span>
          </h1>
          
          <p 
            style={{ color: colors.moss }}
            className="text-lg sm:text-xl mb-8 leading-relaxed"
          >
            Access 10,000+ study materials for SSC, Banking, Railways, UPSC & more. 
            Join thousands of students preparing together in real-time.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div 
              style={{
                backgroundColor: colors.eerieBlack,
                borderColor: `${colors.moss}30`,
              }}
              className="flex items-center px-6 py-4 rounded-2xl border-2 shadow-2xl"
            >
              <Search style={{ color: colors.moss }} className="h-6 w-6 mr-3" />
              <input
                type="text"
                placeholder="Search for exam, subject, or topic..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{
                  backgroundColor: 'transparent',
                  color: colors.pureWhite,
                }}
                className="flex-1 outline-none text-base placeholder-gray-500"
              />
              <button
                style={{
                  background: `linear-gradient(to right, ${colors.hotOrange}, ${colors.orangeWheel})`,
                  color: colors.pureWhite,
                }}
                className="px-6 py-2 rounded-xl font-semibold transition-all duration-200 hover:shadow-lg flex items-center space-x-2"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = `0 10px 30px ${colors.hotOrange}50`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <span>Search</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
            <Link
              to="/resources"
              style={{
                background: `linear-gradient(to right, ${colors.hotOrange}, ${colors.orangeWheel})`,
                color: colors.pureWhite,
              }}
              className="px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 hover:shadow-lg flex items-center space-x-2 w-full sm:w-auto justify-center"
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = `0 20px 40px ${colors.hotOrange}40`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              <Sparkles className="h-5 w-5" />
              <span>Explore Resources</span>
            </Link>

            <Link
              to="/study-rooms"
              style={{
                backgroundColor: 'transparent',
                borderColor: colors.moss,
                color: colors.moss,
              }}
              className="px-8 py-4 rounded-xl font-semibold text-lg border-2 transition-all duration-200 flex items-center space-x-2 w-full sm:w-auto justify-center"
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = `${colors.moss}20`;
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              <Target className="h-5 w-5" />
              <span>Join Study Rooms</span>
            </Link>
          </div>
        </div>

        {/* Quick Access Categories */}
        <div className="mb-12">
          <h3 
            style={{ color: colors.pureWhite }}
            className="text-center text-xl font-semibold mb-6"
          >
            Quick Access to Popular Exams
          </h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {quickAccessCategories.map((category, index) => (
              <Link
                key={index}
                to={category.path}
                style={{
                  backgroundColor: colors.eerieBlack,
                  borderColor: `${category.color}30`,
                }}
                className="p-6 rounded-xl border-2 transition-all duration-300 hover:shadow-xl group"
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = category.color;
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = `0 20px 40px ${category.color}20`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `${category.color}30`;
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <div className="text-center">
                  <div className="text-4xl mb-3">{category.icon}</div>
                  <h4 
                    style={{ color: colors.pureWhite }}
                    className="font-semibold mb-2"
                  >
                    {category.name}
                  </h4>
                  <div className="flex items-center justify-center space-x-1">
                    <Users 
                      style={{ color: colors.moss }}
                      className="h-3 w-3"
                    />
                    <span 
                      style={{ color: colors.moss }}
                      className="text-xs"
                    >
                      {category.students.toLocaleString()} active
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div 
          style={{
            backgroundColor: `${colors.eerieBlack}80`,
            backdropFilter: 'blur(10px)',
          }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto p-8 rounded-2xl"
        >
          {stats.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <div key={index} className="text-center">
                <div 
                  style={{ backgroundColor: `${colors.hotOrange}20` }}
                  className="inline-flex items-center justify-center w-16 h-16 rounded-full mb-4"
                >
                  <Icon style={{ color: colors.hotOrange }} className="h-8 w-8" />
                </div>
                <h4 
                  style={{ color: colors.pureWhite }}
                  className="text-3xl font-bold mb-2"
                >
                  {stat.value}
                </h4>
                <p style={{ color: colors.moss }} className="text-sm">
                  {stat.label}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
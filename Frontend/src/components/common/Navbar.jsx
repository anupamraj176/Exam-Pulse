import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Menu, 
  X, 
  BookOpen, 
  Calendar, 
  Bell, 
  User, 
  Search,
  ChevronDown,
  Radio,
  LogOut,
  Settings,
  Bookmark
} from 'lucide-react';
import useAuthStore from '../../store/authStore';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isExamDropdownOpen, setIsExamDropdownOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setIsProfileDropdownOpen(false);
    navigate('/');
  };

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

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsExamDropdownOpen(false);
  }, [location]);

  const examCategories = [
    { name: 'SSC', path: '/exams/ssc', icon: '📋' },
    { name: 'Banking', path: '/exams/banking', icon: '🏦' },
    { name: 'Railways', path: '/exams/railways', icon: '🚂' },
    { name: 'UPSC', path: '/exams/upsc', icon: '🎯' },
    { name: 'State PSC', path: '/exams/state-psc', icon: '🏛️' },
    { name: 'Defence', path: '/exams/defence', icon: '⚔️' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      style={{
        backgroundColor: isScrolled ? 'rgba(16, 12, 11, 0.95)' : 'rgba(16, 12, 11, 0.8)',
        backdropFilter: isScrolled ? 'blur(12px)' : 'blur(4px)',
        boxShadow: isScrolled ? `0 4px 20px rgba(233, 70, 10, 0.05)` : 'none',
      }}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="relative">
              <div 
                className="absolute inset-0 blur-xl transition-all duration-300"
                style={{ backgroundColor: `rgba(233, 70, 10, ${isScrolled ? '0.3' : '0.2'})` }}
              ></div>
              <BookOpen 
                className="h-8 w-8 relative" 
                style={{ color: colors.hotOrange }}
                strokeWidth={2.5} 
              />
            </div>
            <div>
              <span className="text-2xl font-display font-bold" style={{ color: colors.pureWhite }}>
                Sarkari<span style={{ color: colors.hotOrange }}>Flow</span>
              </span>
              <div className="flex items-center space-x-1">
                <Radio 
                  className="h-2.5 w-2.5 animate-pulse" 
                  style={{ color: colors.hotOrange }}
                />
                <span 
                  className="text-[10px] uppercase tracking-wider"
                  style={{ color: colors.moss }}
                >
                  Live
                </span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link
              to="/"
              style={{
                color: isActive('/') ? colors.hotOrange : colors.pureWhite,
                backgroundColor: isActive('/') ? 'rgba(233, 70, 10, 0.1)' : 'transparent',
              }}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-opacity-100"
              onMouseEnter={(e) => {
                if (!isActive('/')) {
                  e.target.style.color = colors.hotOrange;
                  e.target.style.backgroundColor = colors.eerieBlack;
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive('/')) {
                  e.target.style.color = colors.pureWhite;
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              Home
            </Link>

            {/* Exams Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsExamDropdownOpen(!isExamDropdownOpen)}
                style={{
                  color: isExamDropdownOpen ? colors.hotOrange : colors.pureWhite,
                  backgroundColor: isExamDropdownOpen ? 'rgba(233, 70, 10, 0.1)' : 'transparent',
                }}
                className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center space-x-1"
                onMouseEnter={(e) => {
                  if (!isExamDropdownOpen) {
                    e.currentTarget.style.color = colors.hotOrange;
                    e.currentTarget.style.backgroundColor = colors.eerieBlack;
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isExamDropdownOpen) {
                    e.currentTarget.style.color = colors.pureWhite;
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <span>Exams</span>
                <ChevronDown 
                  className={`h-4 w-4 transition-transform duration-200 ${isExamDropdownOpen ? 'rotate-180' : ''}`} 
                />
              </button>

              {isExamDropdownOpen && (
                <div 
                  style={{
                    backgroundColor: colors.eerieBlack,
                    borderColor: `rgba(153, 165, 125, 0.2)`,
                    boxShadow: `0 20px 40px rgba(233, 70, 10, 0.1)`,
                  }}
                  className="absolute top-full left-0 mt-2 w-64 border rounded-xl animate-slide-down"
                >
                  <div className="p-2">
                    {examCategories.map((exam) => (
                      <Link
                        key={exam.path}
                        to={exam.path}
                        style={{ color: colors.pureWhite }}
                        className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200"
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = colors.smokyBlack;
                          e.currentTarget.style.color = colors.hotOrange;
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                          e.currentTarget.style.color = colors.pureWhite;
                        }}
                      >
                        <span className="text-xl">{exam.icon}</span>
                        <span className="text-sm font-medium">{exam.name}</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/resources"
              style={{
                color: isActive('/resources') ? colors.hotOrange : colors.pureWhite,
                backgroundColor: isActive('/resources') ? 'rgba(233, 70, 10, 0.1)' : 'transparent',
              }}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              onMouseEnter={(e) => {
                if (!isActive('/resources')) {
                  e.target.style.color = colors.hotOrange;
                  e.target.style.backgroundColor = colors.eerieBlack;
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive('/resources')) {
                  e.target.style.color = colors.pureWhite;
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              Resources
            </Link>

            <Link
              to="/pyq"
              style={{
                color: isActive('/pyq') ? colors.hotOrange : colors.pureWhite,
                backgroundColor: isActive('/pyq') ? 'rgba(233, 70, 10, 0.1)' : 'transparent',
              }}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              onMouseEnter={(e) => {
                if (!isActive('/pyq')) {
                  e.target.style.color = colors.hotOrange;
                  e.target.style.backgroundColor = colors.eerieBlack;
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive('/pyq')) {
                  e.target.style.color = colors.pureWhite;
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              PYQ
            </Link>

            <Link
              to="/study-rooms"
              style={{
                color: isActive('/study-rooms') ? colors.hotOrange : colors.pureWhite,
                backgroundColor: isActive('/study-rooms') ? 'rgba(233, 70, 10, 0.1)' : 'transparent',
              }}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200"
              onMouseEnter={(e) => {
                if (!isActive('/study-rooms')) {
                  e.target.style.color = colors.hotOrange;
                  e.target.style.backgroundColor = colors.eerieBlack;
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive('/study-rooms')) {
                  e.target.style.color = colors.pureWhite;
                  e.target.style.backgroundColor = 'transparent';
                }
              }}
            >
              Study Rooms
            </Link>
          </div>

          {/* Right Side Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            {/* Search Button */}
            <button 
              style={{ color: colors.pureWhite }}
              className="p-2 rounded-lg transition-all duration-200"
              onMouseEnter={(e) => {
                e.currentTarget.style.color = colors.hotOrange;
                e.currentTarget.style.backgroundColor = colors.eerieBlack;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = colors.pureWhite;
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Notifications */}
            <button 
              style={{ color: colors.pureWhite }}
              className="p-2 rounded-lg transition-all duration-200 relative"
              onMouseEnter={(e) => {
                e.currentTarget.style.color = colors.hotOrange;
                e.currentTarget.style.backgroundColor = colors.eerieBlack;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = colors.pureWhite;
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              <Bell className="h-5 w-5" />
              <span 
                style={{ backgroundColor: colors.hotOrange }}
                className="absolute top-1 right-1 h-2 w-2 rounded-full animate-pulse"
              ></span>
            </button>

            {isAuthenticated ? (
              <>
                {/* Calendar */}
                <Link
                  to="/calendar"
                  style={{ color: colors.pureWhite }}
                  className="p-2 rounded-lg transition-all duration-200"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = colors.hotOrange;
                    e.currentTarget.style.backgroundColor = colors.eerieBlack;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = colors.pureWhite;
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <Calendar className="h-5 w-5" />
                </Link>

                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                    style={{ color: colors.pureWhite }}
                    className="flex items-center space-x-2 px-3 py-2 rounded-lg transition-all duration-200"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = colors.eerieBlack;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                  >
                    <div 
                      style={{
                        background: `linear-gradient(to bottom right, ${colors.hotOrange}, ${colors.orangeWheel})`,
                        color: colors.pureWhite,
                      }}
                      className="h-8 w-8 rounded-full flex items-center justify-center font-bold text-sm"
                    >
                      {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                    </div>
                  </button>

                  {isProfileDropdownOpen && (
                    <div 
                      style={{
                        backgroundColor: colors.eerieBlack,
                        borderColor: `rgba(153, 165, 125, 0.2)`,
                        boxShadow: `0 20px 40px rgba(233, 70, 10, 0.1)`,
                      }}
                      className="absolute top-full right-0 mt-2 w-56 border rounded-xl animate-slide-down"
                    >
                      <div className="p-2">
                        <Link
                          to="/profile"
                          style={{ color: colors.pureWhite }}
                          className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200"
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = colors.smokyBlack;
                            e.currentTarget.style.color = colors.hotOrange;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = colors.pureWhite;
                          }}
                        >
                          <User className="h-4 w-4" />
                          <span className="text-sm font-medium">My Profile</span>
                        </Link>
                        <Link
                          to="/dashboard"
                          style={{ color: colors.pureWhite }}
                          className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200"
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = colors.smokyBlack;
                            e.currentTarget.style.color = colors.hotOrange;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = colors.pureWhite;
                          }}
                        >
                          <Calendar className="h-4 w-4" />
                          <span className="text-sm font-medium">Dashboard</span>
                        </Link>
                        <Link
                          to="/bookmarks"
                          style={{ color: colors.pureWhite }}
                          className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200"
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = colors.smokyBlack;
                            e.currentTarget.style.color = colors.hotOrange;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = colors.pureWhite;
                          }}
                        >
                          <Bookmark className="h-4 w-4" />
                          <span className="text-sm font-medium">Bookmarks</span>
                        </Link>
                        <Link
                          to="/settings"
                          style={{ color: colors.pureWhite }}
                          className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200"
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = colors.smokyBlack;
                            e.currentTarget.style.color = colors.hotOrange;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = colors.pureWhite;
                          }}
                        >
                          <Settings className="h-4 w-4" />
                          <span className="text-sm font-medium">Settings</span>
                        </Link>
                        {user?.role === 'admin' && (
                          <>
                            <div style={{ borderColor: `rgba(153, 165, 125, 0.2)` }} className="border-t my-2"></div>
                            <Link
                              to="/admin"
                              style={{ color: colors.hotOrange }}
                              className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200"
                              onMouseEnter={(e) => {
                                e.currentTarget.style.backgroundColor = colors.smokyBlack;
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.backgroundColor = 'transparent';
                              }}
                            >
                              <Settings className="h-4 w-4" />
                              <span className="text-sm font-medium">Admin Panel</span>
                            </Link>
                          </>
                        )}
                        <div style={{ borderColor: `rgba(153, 165, 125, 0.2)` }} className="border-t my-2"></div>
                        <button 
                          style={{ color: colors.pureWhite }}
                          className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 w-full"
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = colors.smokyBlack;
                            e.currentTarget.style.color = colors.hotOrange;
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                            e.currentTarget.style.color = colors.pureWhite;
                          }}
                          onClick={handleLogout}
                        >
                          <LogOut className="h-4 w-4" />
                          <span className="text-sm font-medium">Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  style={{ color: colors.pureWhite }}
                  className="px-5 py-2 font-medium transition-colors duration-200"
                  onMouseEnter={(e) => {
                    e.target.style.color = colors.hotOrange;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.color = colors.pureWhite;
                  }}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  style={{
                    background: `linear-gradient(to right, ${colors.hotOrange}, ${colors.orangeWheel})`,
                    color: colors.pureWhite,
                  }}
                  className="px-5 py-2 font-medium rounded-lg transition-all duration-200"
                  onMouseEnter={(e) => {
                    e.target.style.boxShadow = `0 10px 30px rgba(233, 70, 10, 0.5)`;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            style={{ color: colors.pureWhite }}
            className="lg:hidden p-2 transition-colors duration-200"
            onMouseEnter={(e) => {
              e.currentTarget.style.color = colors.hotOrange;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.color = colors.pureWhite;
            }}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div 
          style={{
            backgroundColor: colors.eerieBlack,
            borderTopColor: `rgba(153, 165, 125, 0.2)`,
          }}
          className="lg:hidden border-t animate-slide-down"
        >
          <div className="px-4 py-6 space-y-3">
            <Link
              to="/"
              style={{
                color: isActive('/') ? colors.hotOrange : colors.pureWhite,
                backgroundColor: isActive('/') ? 'rgba(233, 70, 10, 0.1)' : 'transparent',
              }}
              className="block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200"
              onMouseEnter={(e) => {
                if (!isActive('/')) e.target.style.backgroundColor = colors.smokyBlack;
              }}
              onMouseLeave={(e) => {
                if (!isActive('/')) e.target.style.backgroundColor = 'transparent';
              }}
            >
              Home
            </Link>

            {/* Mobile Exam Categories */}
            <div className="space-y-2">
              <button
                onClick={() => setIsExamDropdownOpen(!isExamDropdownOpen)}
                style={{ color: colors.pureWhite }}
                className="flex items-center justify-between w-full px-4 py-3 rounded-lg text-base font-medium transition-all duration-200"
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = colors.smokyBlack;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <span>Exams</span>
                <ChevronDown className={`h-5 w-5 transition-transform duration-200 ${isExamDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {isExamDropdownOpen && (
                <div className="pl-4 space-y-2">
                  {examCategories.map((exam) => (
                    <Link
                      key={exam.path}
                      to={exam.path}
                      style={{ color: colors.moss }}
                      className="flex items-center space-x-3 px-4 py-2 rounded-lg transition-all duration-200"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = colors.smokyBlack;
                        e.currentTarget.style.color = colors.hotOrange;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                        e.currentTarget.style.color = colors.moss;
                      }}
                    >
                      <span className="text-lg">{exam.icon}</span>
                      <span className="text-sm">{exam.name}</span>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              to="/resources"
              style={{
                color: isActive('/resources') ? colors.hotOrange : colors.pureWhite,
                backgroundColor: isActive('/resources') ? 'rgba(233, 70, 10, 0.1)' : 'transparent',
              }}
              className="block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200"
              onMouseEnter={(e) => {
                if (!isActive('/resources')) e.target.style.backgroundColor = colors.smokyBlack;
              }}
              onMouseLeave={(e) => {
                if (!isActive('/resources')) e.target.style.backgroundColor = 'transparent';
              }}
            >
              Resources
            </Link>

            <Link
              to="/pyq"
              style={{
                color: isActive('/pyq') ? colors.hotOrange : colors.pureWhite,
                backgroundColor: isActive('/pyq') ? 'rgba(233, 70, 10, 0.1)' : 'transparent',
              }}
              className="block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200"
              onMouseEnter={(e) => {
                if (!isActive('/pyq')) e.target.style.backgroundColor = colors.smokyBlack;
              }}
              onMouseLeave={(e) => {
                if (!isActive('/pyq')) e.target.style.backgroundColor = 'transparent';
              }}
            >
              PYQ
            </Link>

            <Link
              to="/study-rooms"
              style={{
                color: isActive('/study-rooms') ? colors.hotOrange : colors.pureWhite,
                backgroundColor: isActive('/study-rooms') ? 'rgba(233, 70, 10, 0.1)' : 'transparent',
              }}
              className="block px-4 py-3 rounded-lg text-base font-medium transition-all duration-200"
              onMouseEnter={(e) => {
                if (!isActive('/study-rooms')) e.target.style.backgroundColor = colors.smokyBlack;
              }}
              onMouseLeave={(e) => {
                if (!isActive('/study-rooms')) e.target.style.backgroundColor = 'transparent';
              }}
            >
              Study Rooms
            </Link>

            {isAuthenticated ? (
              <>
                <div style={{ borderColor: `rgba(153, 165, 125, 0.2)` }} className="border-t my-4"></div>
                <Link
                  to="/dashboard"
                  style={{ color: colors.pureWhite }}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = colors.smokyBlack;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <User className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
                <Link
                  to="/bookmarks"
                  style={{ color: colors.pureWhite }}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = colors.smokyBlack;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <Bookmark className="h-5 w-5" />
                  <span>Bookmarks</span>
                </Link>
                <Link
                  to="/calendar"
                  style={{ color: colors.pureWhite }}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = colors.smokyBlack;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <Calendar className="h-5 w-5" />
                  <span>Calendar</span>
                </Link>
                <button 
                  style={{ color: colors.pureWhite }}
                  className="flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 w-full"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = colors.smokyBlack;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }}
                >
                  <LogOut className="h-5 w-5" />
                  <span>Logout</span>
                </button>
              </>
            ) : (
              <>
                <div style={{ borderColor: `rgba(153, 165, 125, 0.2)` }} className="border-t my-4"></div>
                <Link
                  to="/login"
                  style={{
                    color: colors.pureWhite,
                    borderColor: colors.hotOrange,
                  }}
                  className="block px-4 py-3 text-center rounded-lg border font-medium transition-all duration-200"
                  onMouseEnter={(e) => {
                    e.target.style.backgroundColor = 'rgba(233, 70, 10, 0.1)';
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.backgroundColor = 'transparent';
                  }}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  style={{
                    background: `linear-gradient(to right, ${colors.hotOrange}, ${colors.orangeWheel})`,
                    color: colors.pureWhite,
                  }}
                  className="block px-4 py-3 text-center font-medium rounded-lg transition-all duration-200"
                  onMouseEnter={(e) => {
                    e.target.style.boxShadow = `0 10px 30px rgba(233, 70, 10, 0.5)`;
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.boxShadow = 'none';
                  }}
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
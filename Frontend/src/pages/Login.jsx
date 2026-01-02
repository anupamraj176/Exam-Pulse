import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  LogIn,
  BookOpen,
  AlertCircle,
  CheckCircle,
  Loader
} from 'lucide-react';
import useAuthStore from '../store/authStore';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();
  
  const { login, isLoading, error, isAuthenticated, clearError } = useAuthStore();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  // Clear error on unmount
  useEffect(() => {
    return () => clearError();
  }, [clearError]);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Basic validation
    if (!email || !password) {
      return;
    }

    const result = await login({ email, password });
    
    if (result.success) {
      navigate('/dashboard');
    }
  };

  return (
    <div 
      style={{ backgroundColor: colors.smokyBlack }}
      className="min-h-screen flex items-center justify-center pt-24 pb-12 px-4 sm:px-6 lg:px-8"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          style={{
            background: `radial-gradient(circle at 20% 30%, ${colors.hotOrange}10 0%, transparent 50%)`,
          }}
          className="absolute top-0 left-0 w-96 h-96 blur-3xl"
        ></div>
        <div 
          style={{
            background: `radial-gradient(circle at 80% 70%, ${colors.orangeWheel}10 0%, transparent 50%)`,
          }}
          className="absolute bottom-0 right-0 w-96 h-96 blur-3xl"
        ></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        
        {/* Logo & Header */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6 group">
            <div className="relative">
              <div 
                style={{ backgroundColor: `${colors.hotOrange}20` }}
                className="absolute inset-0 blur-xl"
              ></div>
              <BookOpen 
                style={{ color: colors.hotOrange }}
                className="h-12 w-12 relative" 
                strokeWidth={2.5} 
              />
            </div>
            <span 
              style={{ color: colors.pureWhite }}
              className="text-3xl font-display font-bold"
            >
              Sarkari<span style={{ color: colors.hotOrange }}>Flow</span>
            </span>
          </Link>

          <h2 
            style={{ color: colors.pureWhite }}
            className="text-3xl font-display font-bold mb-2"
          >
            Welcome Back!
          </h2>
          <p 
            style={{ color: colors.moss }}
            className="text-base"
          >
            Sign in to continue your preparation journey
          </p>
        </div>

        {/* Login Card */}
        <div
          style={{
            backgroundColor: colors.eerieBlack,
            borderColor: `${colors.moss}20`,
          }}
          className="rounded-2xl border-2 p-8 shadow-2xl"
        >
          
          {/* Error Message */}
          {error && (
            <div 
              style={{
                backgroundColor: `${colors.hotOrange}10`,
                borderColor: `${colors.hotOrange}30`,
              }}
              className="mb-6 p-4 rounded-lg border flex items-start space-x-3 animate-fade-in"
            >
              <AlertCircle 
                style={{ color: colors.hotOrange }}
                className="h-5 w-5 flex-shrink-0 mt-0.5"
              />
              <p 
                style={{ color: colors.hotOrange }}
                className="text-sm font-medium"
              >
                {error}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Email Field */}
            <div>
              <label 
                htmlFor="email"
                style={{ color: colors.pureWhite }}
                className="block text-sm font-semibold mb-2"
              >
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail 
                    style={{ color: colors.moss }}
                    className="h-5 w-5"
                  />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  style={{
                    backgroundColor: colors.smokyBlack,
                    borderColor: `${colors.moss}30`,
                    color: colors.pureWhite,
                  }}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 outline-none text-sm focus:border-hotOrange transition-colors placeholder-gray-500"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label 
                htmlFor="password"
                style={{ color: colors.pureWhite }}
                className="block text-sm font-semibold mb-2"
              >
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock 
                    style={{ color: colors.moss }}
                    className="h-5 w-5"
                  />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  style={{
                    backgroundColor: colors.smokyBlack,
                    borderColor: `${colors.moss}30`,
                    color: colors.pureWhite,
                  }}
                  className="w-full pl-12 pr-12 py-3 rounded-xl border-2 outline-none text-sm focus:border-hotOrange transition-colors placeholder-gray-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  style={{ color: colors.moss }}
                >
                  {showPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  style={{
                    accentColor: colors.hotOrange,
                  }}
                  className="w-4 h-4 rounded cursor-pointer"
                />
                <span 
                  style={{ color: colors.moss }}
                  className="text-sm"
                >
                  Remember me
                </span>
              </label>

              <Link
                to="/forgot-password"
                style={{ color: colors.hotOrange }}
                className="text-sm font-medium hover:underline"
              >
                Forgot Password?
              </Link>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              style={{
                background: isLoading 
                  ? colors.eerieLight 
                  : `linear-gradient(to right, ${colors.hotOrange}, ${colors.orangeWheel})`,
                color: colors.pureWhite,
              }}
              className="w-full py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              onMouseEnter={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = `0 10px 30px ${colors.hotOrange}40`;
                }
              }}
              onMouseLeave={(e) => {
                if (!isLoading) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
            >
              {isLoading ? (
                <>
                  <Loader className="h-5 w-5 animate-spin" />
                  <span>Signing in...</span>
                </>
              ) : (
                <>
                  <LogIn className="h-5 w-5" />
                  <span>Sign In</span>
                </>
              )}
            </button>

            {/* Divider */}
            <div className="relative my-6">
              <div 
                style={{ backgroundColor: `${colors.moss}20` }}
                className="absolute inset-0 flex items-center"
              >
                <div className="w-full border-t"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span 
                  style={{ 
                    backgroundColor: colors.eerieBlack,
                    color: colors.moss,
                  }}
                  className="px-4"
                >
                  Quick Login
                </span>
              </div>
            </div>

            {/* Quick Login Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => {
                  setEmail('anupamraj176@gmail.com');
                  setPassword('Mummypapa143@#');
                }}
                style={{
                  backgroundColor: `${colors.hotOrange}15`,
                  borderColor: colors.hotOrange,
                  color: colors.hotOrange,
                }}
                className="py-3 rounded-xl border-2 font-medium text-sm transition-all duration-200 hover:bg-opacity-30"
              >
                <div className="flex items-center justify-center space-x-2">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  <span>Login as Admin</span>
                </div>
              </button>

              <button
                type="button"
                onClick={() => {
                  setEmail('user@exampulse.com');
                  setPassword('User@123');
                }}
                style={{
                  backgroundColor: `${colors.moss}15`,
                  borderColor: colors.moss,
                  color: colors.moss,
                }}
                className="py-3 rounded-xl border-2 font-medium text-sm transition-all duration-200 hover:bg-opacity-30"
              >
                <div className="flex items-center justify-center space-x-2">
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                  <span>Login as User</span>
                </div>
              </button>
            </div>

            {/* Info text */}
            <p 
              style={{ color: colors.moss }}
              className="text-xs text-center mt-3"
            >
              Click a button above to fill credentials, then click Sign In
            </p>
          </form>

          {/* Sign Up Link */}
          <div className="mt-6 text-center">
            <p 
              style={{ color: colors.moss }}
              className="text-sm"
            >
              Don't have an account?{' '}
              <Link
                to="/register"
                style={{ color: colors.hotOrange }}
                className="font-semibold hover:underline"
              >
                Sign up for free
              </Link>
            </p>
          </div>
        </div>

        {/* Bottom Info */}
        <div className="mt-8 text-center">
          <p 
            style={{ color: colors.moss }}
            className="text-xs"
          >
            By signing in, you agree to our{' '}
            <Link to="/terms" style={{ color: colors.hotOrange }} className="hover:underline">
              Terms of Service
            </Link>
            {' '}and{' '}
            <Link to="/privacy" style={{ color: colors.hotOrange }} className="hover:underline">
              Privacy Policy
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
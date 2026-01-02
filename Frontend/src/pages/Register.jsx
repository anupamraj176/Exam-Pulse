import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  User,
  BookOpen,
  AlertCircle,
  CheckCircle,
  Loader,
  Phone
} from 'lucide-react';
import useAuthStore from '../store/authStore';

const Register = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const { register, isLoading, error, isAuthenticated, clearError } = useAuthStore();

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!formData.email.includes('@')) {
      newErrors.email = 'Please enter a valid email';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (formData.phone.length < 10) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!agreeToTerms) {
      newErrors.terms = 'You must agree to the terms and conditions';
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const result = await register({
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    });
    
    if (result.success) {
      navigate('/dashboard');
    }
  };

  const passwordStrength = () => {
    const password = formData.password;
    if (!password) return { strength: 0, label: '', color: colors.moss };
    
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/\d/)) strength++;
    if (password.match(/[^a-zA-Z\d]/)) strength++;

    const levels = [
      { strength: 1, label: 'Weak', color: colors.hotOrange },
      { strength: 2, label: 'Fair', color: colors.orangeWheel },
      { strength: 3, label: 'Good', color: colors.moss },
      { strength: 4, label: 'Strong', color: colors.moss },
    ];

    return levels[strength - 1] || { strength: 0, label: '', color: colors.moss };
  };

  const strength = passwordStrength();

  return (
    <div 
      style={{ backgroundColor: colors.smokyBlack }}
      className="min-h-screen flex items-center justify-center pt-24 pb-12 px-4 sm:px-6 lg:px-8"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          style={{
            background: `radial-gradient(circle at 80% 20%, ${colors.hotOrange}10 0%, transparent 50%)`,
          }}
          className="absolute top-0 right-0 w-96 h-96 blur-3xl"
        ></div>
        <div 
          style={{
            background: `radial-gradient(circle at 20% 80%, ${colors.orangeWheel}10 0%, transparent 50%)`,
          }}
          className="absolute bottom-0 left-0 w-96 h-96 blur-3xl"
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
            Create Your Account
          </h2>
          <p 
            style={{ color: colors.moss }}
            className="text-base"
          >
            Join thousands of students preparing for government exams
          </p>
        </div>

        {/* Register Card */}
        <div
          style={{
            backgroundColor: colors.eerieBlack,
            borderColor: `${colors.moss}20`,
          }}
          className="rounded-2xl border-2 p-8 shadow-2xl"
        >
          
          {/* Terms Error */}
          {errors.terms && (
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
                {errors.terms}
              </p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            
            {/* Name Field */}
            <div>
              <label 
                htmlFor="name"
                style={{ color: colors.pureWhite }}
                className="block text-sm font-semibold mb-2"
              >
                Full Name
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User 
                    style={{ color: colors.moss }}
                    className="h-5 w-5"
                  />
                </div>
                <input
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your full name"
                  style={{
                    backgroundColor: colors.smokyBlack,
                    borderColor: errors.name ? colors.hotOrange : `${colors.moss}30`,
                    color: colors.pureWhite,
                  }}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 outline-none text-sm focus:border-hotOrange transition-colors placeholder-gray-500"
                />
              </div>
              {errors.name && (
                <p 
                  style={{ color: colors.hotOrange }}
                  className="text-xs mt-1"
                >
                  {errors.name}
                </p>
              )}
            </div>

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
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  style={{
                    backgroundColor: colors.smokyBlack,
                    borderColor: errors.email ? colors.hotOrange : `${colors.moss}30`,
                    color: colors.pureWhite,
                  }}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 outline-none text-sm focus:border-hotOrange transition-colors placeholder-gray-500"
                />
              </div>
              {errors.email && (
                <p 
                  style={{ color: colors.hotOrange }}
                  className="text-xs mt-1"
                >
                  {errors.email}
                </p>
              )}
            </div>

            {/* Phone Field */}
            <div>
              <label 
                htmlFor="phone"
                style={{ color: colors.pureWhite }}
                className="block text-sm font-semibold mb-2"
              >
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Phone 
                    style={{ color: colors.moss }}
                    className="h-5 w-5"
                  />
                </div>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  style={{
                    backgroundColor: colors.smokyBlack,
                    borderColor: errors.phone ? colors.hotOrange : `${colors.moss}30`,
                    color: colors.pureWhite,
                  }}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border-2 outline-none text-sm focus:border-hotOrange transition-colors placeholder-gray-500"
                />
              </div>
              {errors.phone && (
                <p 
                  style={{ color: colors.hotOrange }}
                  className="text-xs mt-1"
                >
                  {errors.phone}
                </p>
              )}
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
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a strong password"
                  style={{
                    backgroundColor: colors.smokyBlack,
                    borderColor: errors.password ? colors.hotOrange : `${colors.moss}30`,
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
              
              {/* Password Strength Indicator */}
              {formData.password && (
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span 
                      style={{ color: colors.moss }}
                      className="text-xs"
                    >
                      Password Strength
                    </span>
                    <span 
                      style={{ color: strength.color }}
                      className="text-xs font-semibold"
                    >
                      {strength.label}
                    </span>
                  </div>
                  <div 
                    style={{ backgroundColor: colors.smokyBlack }}
                    className="h-2 rounded-full overflow-hidden"
                  >
                    <div
                      style={{
                        width: `${(strength.strength / 4) * 100}%`,
                        backgroundColor: strength.color,
                      }}
                      className="h-full rounded-full transition-all duration-300"
                    />
                  </div>
                </div>
              )}
              
              {errors.password && (
                <p 
                  style={{ color: colors.hotOrange }}
                  className="text-xs mt-1"
                >
                  {errors.password}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label 
                htmlFor="confirmPassword"
                style={{ color: colors.pureWhite }}
                className="block text-sm font-semibold mb-2"
              >
                Confirm Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock 
                    style={{ color: colors.moss }}
                    className="h-5 w-5"
                  />
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                  style={{
                    backgroundColor: colors.smokyBlack,
                    borderColor: errors.confirmPassword ? colors.hotOrange : `${colors.moss}30`,
                    color: colors.pureWhite,
                  }}
                  className="w-full pl-12 pr-12 py-3 rounded-xl border-2 outline-none text-sm focus:border-hotOrange transition-colors placeholder-gray-500"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center"
                  style={{ color: colors.moss }}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-5 w-5" />
                  ) : (
                    <Eye className="h-5 w-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p 
                  style={{ color: colors.hotOrange }}
                  className="text-xs mt-1"
                >
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Terms & Conditions */}
            <div>
              <label className="flex items-start space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={(e) => {
                    setAgreeToTerms(e.target.checked);
                    if (errors.terms) {
                      setErrors(prev => ({ ...prev, terms: '' }));
                    }
                  }}
                  style={{
                    accentColor: colors.hotOrange,
                  }}
                  className="w-4 h-4 mt-0.5 rounded cursor-pointer"
                />
                <span 
                  style={{ color: colors.moss }}
                  className="text-sm"
                >
                  I agree to the{' '}
                  <Link to="/terms" style={{ color: colors.hotOrange }} className="hover:underline">
                    Terms of Service
                  </Link>
                  {' '}and{' '}
                  <Link to="/privacy" style={{ color: colors.hotOrange }} className="hover:underline">
                    Privacy Policy
                  </Link>
                </span>
              </label>
            </div>

            {/* Register Button */}
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
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="h-5 w-5" />
                  <span>Create Account</span>
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
                  Or sign up with
                </span>
              </div>
            </div>

            {/* Social Sign Up Buttons */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                style={{
                  backgroundColor: colors.smokyBlack,
                  borderColor: `${colors.moss}30`,
                  color: colors.pureWhite,
                }}
                className="py-3 rounded-xl border-2 font-medium text-sm transition-all duration-200 hover:border-hotOrange"
              >
                <div className="flex items-center justify-center space-x-2">
                  <svg className="h-5 w-5" viewBox="0 0 24 24">
                    <path
                      fill="currentColor"
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    />
                    <path
                      fill="currentColor"
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    />
                    <path
                      fill="currentColor"
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    />
                  </svg>
                  <span>Google</span>
                </div>
              </button>

              <button
                type="button"
                style={{
                  backgroundColor: colors.smokyBlack,
                  borderColor: `${colors.moss}30`,
                  color: colors.pureWhite,
                }}
                className="py-3 rounded-xl border-2 font-medium text-sm transition-all duration-200 hover:border-hotOrange"
              >
                <div className="flex items-center justify-center space-x-2">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                  <span>Facebook</span>
                </div>
              </button>
            </div>
          </form>

          {/* Sign In Link */}
          <div className="mt-6 text-center">
            <p 
              style={{ color: colors.moss }}
              className="text-sm"
            >
              Already have an account?{' '}
              <Link
                to="/login"
                style={{ color: colors.hotOrange }}
                className="font-semibold hover:underline"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
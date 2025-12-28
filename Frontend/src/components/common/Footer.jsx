import { Link } from 'react-router-dom';
import { 
  BookOpen, 
  Mail, 
  MapPin, 
  Phone,
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Linkedin,
  Github,
  Heart,
  ExternalLink,
  Radio
} from 'lucide-react';

const Footer = () => {
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

  const examCategories = [
    { name: 'SSC', path: '/exams/ssc' },
    { name: 'Banking', path: '/exams/banking' },
    { name: 'Railways', path: '/exams/railways' },
    { name: 'UPSC', path: '/exams/upsc' },
    { name: 'State PSC', path: '/exams/state-psc' },
    { name: 'Defence', path: '/exams/defence' },
  ];

  const quickLinks = [
    { name: 'About Us', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
    { name: 'Privacy Policy', path: '/privacy' },
    { name: 'Terms of Service', path: '/terms' },
    { name: 'Refund Policy', path: '/refund' },
    { name: 'FAQ', path: '/faq' },
  ];

  const resources = [
    { name: 'Study Materials', path: '/resources' },
    { name: 'Previous Year Papers', path: '/pyq' },
    { name: 'Mock Tests', path: '/mock-tests' },
    { name: 'Study Rooms', path: '/study-rooms' },
    { name: 'Exam Calendar', path: '/calendar' },
    { name: 'Notifications', path: '/notifications' },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, url: 'https://facebook.com', color: '#1877F2' },
    { name: 'Twitter', icon: Twitter, url: 'https://twitter.com', color: '#1DA1F2' },
    { name: 'Instagram', icon: Instagram, url: 'https://instagram.com', color: '#E4405F' },
    { name: 'Youtube', icon: Youtube, url: 'https://youtube.com', color: '#FF0000' },
    { name: 'Linkedin', icon: Linkedin, url: 'https://linkedin.com', color: '#0A66C2' },
    { name: 'Github', icon: Github, url: 'https://github.com', color: colors.pureWhite },
  ];

  return (
    <footer 
      style={{ 
        backgroundColor: colors.smokyBlack,
        borderTop: `2px solid ${colors.eerieBlack}`,
      }}
      className="relative overflow-hidden"
    >
      {/* Background Decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-30">
        <div 
          style={{
            background: `radial-gradient(circle at 20% 80%, ${colors.hotOrange}10 0%, transparent 50%)`,
          }}
          className="absolute bottom-0 left-0 w-96 h-96 blur-3xl"
        ></div>
        <div 
          style={{
            background: `radial-gradient(circle at 80% 80%, ${colors.moss}10 0%, transparent 50%)`,
          }}
          className="absolute bottom-0 right-0 w-96 h-96 blur-3xl"
        ></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 py-12 lg:py-16">
          
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-4 group">
              <div className="relative">
                <div 
                  style={{ backgroundColor: `${colors.hotOrange}20` }}
                  className="absolute inset-0 blur-xl"
                ></div>
                <BookOpen 
                  style={{ color: colors.hotOrange }}
                  className="h-8 w-8 relative" 
                  strokeWidth={2.5} 
                />
              </div>
              <div>
                <span 
                  style={{ color: colors.pureWhite }}
                  className="text-2xl font-display font-bold"
                >
                  Sarkari<span style={{ color: colors.hotOrange }}>Flow</span>
                </span>
                <div className="flex items-center space-x-1">
                  <Radio 
                    style={{ color: colors.hotOrange }}
                    className="h-2 w-2 animate-pulse" 
                  />
                  <span 
                    style={{ color: colors.moss }}
                    className="text-[10px] uppercase tracking-wider"
                  >
                    Live
                  </span>
                </div>
              </div>
            </Link>
            
            <p 
              style={{ color: colors.moss }}
              className="text-sm mb-6 leading-relaxed"
            >
              Your ultimate hub for government exam preparation. Join thousands of students achieving their dreams with quality study materials and real-time updates.
            </p>

            {/* Social Links */}
            <div className="flex items-center space-x-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      backgroundColor: colors.eerieBlack,
                      color: colors.moss,
                    }}
                    className="p-2.5 rounded-lg transition-all duration-200 hover:shadow-lg"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = social.color;
                      e.currentTarget.style.color = colors.pureWhite;
                      e.currentTarget.style.transform = 'translateY(-3px)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = colors.eerieBlack;
                      e.currentTarget.style.color = colors.moss;
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Exam Categories */}
          <div>
            <h3 
              style={{ color: colors.pureWhite }}
              className="text-lg font-bold mb-4"
            >
              Exam Categories
            </h3>
            <ul className="space-y-3">
              {examCategories.map((category) => (
                <li key={category.path}>
                  <Link
                    to={category.path}
                    style={{ color: colors.moss }}
                    className="text-sm transition-colors duration-200 hover:underline flex items-center space-x-2"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = colors.hotOrange;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = colors.moss;
                    }}
                  >
                    <span>→</span>
                    <span>{category.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 
              style={{ color: colors.pureWhite }}
              className="text-lg font-bold mb-4"
            >
              Resources
            </h3>
            <ul className="space-y-3">
              {resources.map((resource) => (
                <li key={resource.path}>
                  <Link
                    to={resource.path}
                    style={{ color: colors.moss }}
                    className="text-sm transition-colors duration-200 hover:underline flex items-center space-x-2"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = colors.hotOrange;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = colors.moss;
                    }}
                  >
                    <span>→</span>
                    <span>{resource.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links & Contact */}
          <div>
            <h3 
              style={{ color: colors.pureWhite }}
              className="text-lg font-bold mb-4"
            >
              Quick Links
            </h3>
            <ul className="space-y-3 mb-6">
              {quickLinks.slice(0, 4).map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    style={{ color: colors.moss }}
                    className="text-sm transition-colors duration-200 hover:underline flex items-center space-x-2"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = colors.hotOrange;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = colors.moss;
                    }}
                  >
                    <span>→</span>
                    <span>{link.name}</span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-start space-x-2">
                <Mail 
                  style={{ color: colors.hotOrange }}
                  className="h-5 w-5 flex-shrink-0 mt-0.5" 
                />
                <a
                  href="mailto:support@sarkariflow.com"
                  style={{ color: colors.moss }}
                  className="text-sm hover:underline"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = colors.hotOrange;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = colors.moss;
                  }}
                >
                  support@sarkariflow.com
                </a>
              </div>

              <div className="flex items-start space-x-2">
                <Phone 
                  style={{ color: colors.hotOrange }}
                  className="h-5 w-5 flex-shrink-0 mt-0.5" 
                />
                <a
                  href="tel:+919876543210"
                  style={{ color: colors.moss }}
                  className="text-sm hover:underline"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = colors.hotOrange;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = colors.moss;
                  }}
                >
                  +91 98765 43210
                </a>
              </div>

              <div className="flex items-start space-x-2">
                <MapPin 
                  style={{ color: colors.hotOrange }}
                  className="h-5 w-5 flex-shrink-0 mt-0.5" 
                />
                <span 
                  style={{ color: colors.moss }}
                  className="text-sm"
                >
                  New Delhi, India
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Newsletter Section */}
        <div 
          style={{
            backgroundColor: colors.eerieBlack,
            borderColor: `${colors.hotOrange}30`,
          }}
          className="border-2 rounded-2xl p-6 lg:p-8 mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="flex-1">
              <h3 
                style={{ color: colors.pureWhite }}
                className="text-xl font-bold mb-2"
              >
                Subscribe to Our Newsletter
              </h3>
              <p 
                style={{ color: colors.moss }}
                className="text-sm"
              >
                Get the latest exam notifications, study tips, and exclusive resources directly in your inbox.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3 lg:w-auto w-full">
              <input
                type="email"
                placeholder="Enter your email"
                style={{
                  backgroundColor: colors.smokyBlack,
                  borderColor: `${colors.moss}30`,
                  color: colors.pureWhite,
                }}
                className="px-4 py-3 rounded-lg border-2 outline-none text-sm flex-1 lg:w-64 focus:border-hotOrange transition-colors"
              />
              <button
                style={{
                  background: `linear-gradient(to right, ${colors.hotOrange}, ${colors.orangeWheel})`,
                  color: colors.pureWhite,
                }}
                className="px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 whitespace-nowrap flex items-center justify-center space-x-2"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                  e.currentTarget.style.boxShadow = `0 10px 30px ${colors.hotOrange}40`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
              >
                <span>Subscribe</span>
                <ExternalLink className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div 
          style={{ borderTopColor: colors.eerieBlack }}
          className="border-t py-6"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <p 
              style={{ color: colors.moss }}
              className="text-sm text-center md:text-left"
            >
              © {new Date().getFullYear()} SarkariFlow. All rights reserved.
            </p>

            <div className="flex items-center justify-center space-x-1 text-sm">
              <span style={{ color: colors.moss }}>Made with</span>
              <Heart 
                style={{ color: colors.hotOrange }}
                className="h-4 w-4 fill-current animate-pulse" 
              />
              <span style={{ color: colors.moss }}>for aspirants</span>
            </div>

            <div className="flex items-center justify-center space-x-4">
              {quickLinks.slice(2, 4).map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  style={{ color: colors.moss }}
                  className="text-sm transition-colors duration-200"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = colors.hotOrange;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = colors.moss;
                  }}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
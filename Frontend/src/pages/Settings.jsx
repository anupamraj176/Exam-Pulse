import { useState, useEffect } from 'react';
import { 
  Settings as SettingsIcon,
  Bell,
  Moon,
  Sun,
  Globe,
  Lock,
  Eye,
  EyeOff,
  Save,
  ChevronRight,
  Smartphone,
  Mail,
  Volume2,
  VolumeX,
  Trash2,
  LogOut,
  Shield,
  Palette,
  Clock,
  CheckCircle,
  AlertCircle,
  X
} from 'lucide-react';
import useAuthStore from '../store/authStore';
import api from '../services/api';

const Settings = () => {
  const { user, isAuthenticated, logout } = useAuthStore();
  const [loading, setSaving] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  const [showPassword, setShowPassword] = useState(false);
  
  const [settings, setSettings] = useState({
    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    examReminders: true,
    resourceUpdates: true,
    weeklyDigest: false,
    soundEnabled: true,
    
    // Appearance
    darkMode: true,
    compactView: false,
    fontSize: 'medium',
    
    // Privacy
    profileVisibility: 'public',
    showActivity: true,
    showStats: true,
    
    // Study Preferences
    dailyGoalHours: 4,
    reminderTime: '09:00',
    preferredLanguage: 'english',
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
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

  useEffect(() => {
    // Load settings from localStorage or API
    const savedSettings = localStorage.getItem('userSettings');
    if (savedSettings) {
      setSettings(prev => ({ ...prev, ...JSON.parse(savedSettings) }));
    }
  }, []);

  const handleToggle = (key) => {
    setSettings(prev => {
      const newSettings = { ...prev, [key]: !prev[key] };
      localStorage.setItem('userSettings', JSON.stringify(newSettings));
      return newSettings;
    });
  };

  const handleChange = (key, value) => {
    setSettings(prev => {
      const newSettings = { ...prev, [key]: value };
      localStorage.setItem('userSettings', JSON.stringify(newSettings));
      return newSettings;
    });
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setMessage({ type: 'error', text: 'New passwords do not match' });
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setMessage({ type: 'error', text: 'Password must be at least 6 characters' });
      return;
    }

    setSaving(true);
    try {
      await api.put('/users/change-password', {
        currentPassword: passwordData.currentPassword,
        newPassword: passwordData.newPassword,
      });
      
      setMessage({ type: 'success', text: 'Password changed successfully!' });
      setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to change password' 
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (!window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      return;
    }
    
    try {
      await api.delete('/users/account');
      logout();
      window.location.href = '/';
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to delete account' });
    }
  };

  if (!isAuthenticated) {
    return (
      <div 
        style={{ backgroundColor: colors.smokyBlack }}
        className="min-h-screen pt-24 pb-12 flex items-center justify-center"
      >
        <div 
          style={{ backgroundColor: colors.eerieBlack, borderColor: colors.hotOrange }}
          className="p-8 rounded-2xl border-2 text-center max-w-md"
        >
          <SettingsIcon style={{ color: colors.hotOrange }} className="h-16 w-16 mx-auto mb-4" />
          <h2 style={{ color: colors.pureWhite }} className="text-2xl font-bold mb-2">
            Please Login
          </h2>
          <p style={{ color: colors.moss }} className="mb-4">
            Login to access settings.
          </p>
          <a 
            href="/login"
            style={{ background: `linear-gradient(to right, ${colors.hotOrange}, ${colors.orangeWheel})` }}
            className="inline-block px-6 py-3 rounded-xl text-white font-semibold"
          >
            Login
          </a>
        </div>
      </div>
    );
  }

  const SettingRow = ({ icon: Icon, title, description, children }) => (
    <div 
      style={{ backgroundColor: colors.night, borderColor: `${colors.moss}20` }}
      className="p-4 rounded-xl border-2 flex items-center justify-between"
    >
      <div className="flex items-center space-x-4">
        <div 
          style={{ backgroundColor: `${colors.hotOrange}20` }}
          className="p-3 rounded-xl"
        >
          <Icon style={{ color: colors.hotOrange }} className="h-5 w-5" />
        </div>
        <div>
          <h3 style={{ color: colors.pureWhite }} className="font-medium">
            {title}
          </h3>
          {description && (
            <p style={{ color: colors.moss }} className="text-sm">
              {description}
            </p>
          )}
        </div>
      </div>
      {children}
    </div>
  );

  const Toggle = ({ enabled, onToggle }) => (
    <button
      onClick={onToggle}
      style={{ 
        backgroundColor: enabled ? colors.hotOrange : colors.eerieBlack,
        borderColor: enabled ? colors.hotOrange : `${colors.moss}30`,
      }}
      className="relative w-14 h-7 rounded-full border-2 transition-all"
    >
      <span
        style={{ backgroundColor: enabled ? colors.pureWhite : colors.moss }}
        className={`absolute top-1 w-5 h-5 rounded-full transition-all ${
          enabled ? 'left-7' : 'left-1'
        }`}
      />
    </button>
  );

  return (
    <div 
      style={{ backgroundColor: colors.smokyBlack }}
      className="min-h-screen pt-24 pb-12"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 style={{ color: colors.pureWhite }} className="text-3xl font-bold mb-2">
            Settings
          </h1>
          <p style={{ color: colors.moss }}>
            Manage your account preferences
          </p>
        </div>

        {/* Message */}
        {message.text && (
          <div 
            style={{ 
              backgroundColor: message.type === 'success' ? `${colors.moss}20` : `${colors.hotOrange}20`,
              borderColor: message.type === 'success' ? colors.moss : colors.hotOrange,
              color: message.type === 'success' ? colors.moss : colors.hotOrange,
            }}
            className="p-4 rounded-xl border-2 mb-6 flex items-center justify-between"
          >
            <div className="flex items-center space-x-3">
              {message.type === 'success' ? (
                <CheckCircle className="h-5 w-5" />
              ) : (
                <AlertCircle className="h-5 w-5" />
              )}
              <span>{message.text}</span>
            </div>
            <button onClick={() => setMessage({ type: '', text: '' })}>
              <X className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* Notifications Section */}
        <div 
          style={{ backgroundColor: colors.eerieBlack, borderColor: `${colors.moss}30` }}
          className="rounded-2xl border-2 p-6 mb-6"
        >
          <h2 style={{ color: colors.pureWhite }} className="text-lg font-bold mb-6 flex items-center space-x-2">
            <Bell style={{ color: colors.hotOrange }} className="h-5 w-5" />
            <span>Notifications</span>
          </h2>

          <div className="space-y-4">
            <SettingRow 
              icon={Mail} 
              title="Email Notifications"
              description="Receive updates via email"
            >
              <Toggle 
                enabled={settings.emailNotifications} 
                onToggle={() => handleToggle('emailNotifications')} 
              />
            </SettingRow>

            <SettingRow 
              icon={Smartphone} 
              title="Push Notifications"
              description="Browser push notifications"
            >
              <Toggle 
                enabled={settings.pushNotifications} 
                onToggle={() => handleToggle('pushNotifications')} 
              />
            </SettingRow>

            <SettingRow 
              icon={Bell} 
              title="Exam Reminders"
              description="Get notified about upcoming exams"
            >
              <Toggle 
                enabled={settings.examReminders} 
                onToggle={() => handleToggle('examReminders')} 
              />
            </SettingRow>

            <SettingRow 
              icon={Volume2} 
              title="Sound Effects"
              description="Play sounds for notifications"
            >
              <Toggle 
                enabled={settings.soundEnabled} 
                onToggle={() => handleToggle('soundEnabled')} 
              />
            </SettingRow>
          </div>
        </div>

        {/* Appearance Section */}
        <div 
          style={{ backgroundColor: colors.eerieBlack, borderColor: `${colors.moss}30` }}
          className="rounded-2xl border-2 p-6 mb-6"
        >
          <h2 style={{ color: colors.pureWhite }} className="text-lg font-bold mb-6 flex items-center space-x-2">
            <Palette style={{ color: colors.hotOrange }} className="h-5 w-5" />
            <span>Appearance</span>
          </h2>

          <div className="space-y-4">
            <SettingRow 
              icon={Moon} 
              title="Dark Mode"
              description="Use dark theme"
            >
              <Toggle 
                enabled={settings.darkMode} 
                onToggle={() => handleToggle('darkMode')} 
              />
            </SettingRow>

            <SettingRow 
              icon={Globe} 
              title="Language"
              description="Choose your preferred language"
            >
              <select
                value={settings.preferredLanguage}
                onChange={(e) => handleChange('preferredLanguage', e.target.value)}
                style={{ backgroundColor: colors.night, borderColor: `${colors.moss}30`, color: colors.pureWhite }}
                className="px-4 py-2 rounded-xl border-2 outline-none"
              >
                <option value="english">English</option>
                <option value="hindi">हिंदी</option>
              </select>
            </SettingRow>

            <SettingRow 
              icon={Clock} 
              title="Daily Study Goal"
              description="Set your daily study hours"
            >
              <select
                value={settings.dailyGoalHours}
                onChange={(e) => handleChange('dailyGoalHours', parseInt(e.target.value))}
                style={{ backgroundColor: colors.night, borderColor: `${colors.moss}30`, color: colors.pureWhite }}
                className="px-4 py-2 rounded-xl border-2 outline-none"
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map(h => (
                  <option key={h} value={h}>{h} hours</option>
                ))}
              </select>
            </SettingRow>
          </div>
        </div>

        {/* Privacy Section */}
        <div 
          style={{ backgroundColor: colors.eerieBlack, borderColor: `${colors.moss}30` }}
          className="rounded-2xl border-2 p-6 mb-6"
        >
          <h2 style={{ color: colors.pureWhite }} className="text-lg font-bold mb-6 flex items-center space-x-2">
            <Shield style={{ color: colors.hotOrange }} className="h-5 w-5" />
            <span>Privacy</span>
          </h2>

          <div className="space-y-4">
            <SettingRow 
              icon={Eye} 
              title="Profile Visibility"
              description="Who can see your profile"
            >
              <select
                value={settings.profileVisibility}
                onChange={(e) => handleChange('profileVisibility', e.target.value)}
                style={{ backgroundColor: colors.night, borderColor: `${colors.moss}30`, color: colors.pureWhite }}
                className="px-4 py-2 rounded-xl border-2 outline-none"
              >
                <option value="public">Public</option>
                <option value="private">Private</option>
                <option value="friends">Friends Only</option>
              </select>
            </SettingRow>

            <SettingRow 
              icon={Eye} 
              title="Show Activity"
              description="Display your activity to others"
            >
              <Toggle 
                enabled={settings.showActivity} 
                onToggle={() => handleToggle('showActivity')} 
              />
            </SettingRow>

            <SettingRow 
              icon={Eye} 
              title="Show Stats"
              description="Display your study statistics"
            >
              <Toggle 
                enabled={settings.showStats} 
                onToggle={() => handleToggle('showStats')} 
              />
            </SettingRow>
          </div>
        </div>

        {/* Security Section */}
        <div 
          style={{ backgroundColor: colors.eerieBlack, borderColor: `${colors.moss}30` }}
          className="rounded-2xl border-2 p-6 mb-6"
        >
          <h2 style={{ color: colors.pureWhite }} className="text-lg font-bold mb-6 flex items-center space-x-2">
            <Lock style={{ color: colors.hotOrange }} className="h-5 w-5" />
            <span>Security</span>
          </h2>

          <form onSubmit={handlePasswordChange} className="space-y-4">
            <div>
              <label style={{ color: colors.moss }} className="block text-sm font-medium mb-2">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData(prev => ({ ...prev, currentPassword: e.target.value }))}
                  style={{ backgroundColor: colors.night, borderColor: `${colors.moss}30`, color: colors.pureWhite }}
                  className="w-full px-4 py-3 rounded-xl border-2 outline-none pr-12"
                  placeholder="Enter current password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? (
                    <EyeOff style={{ color: colors.moss }} className="h-5 w-5" />
                  ) : (
                    <Eye style={{ color: colors.moss }} className="h-5 w-5" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label style={{ color: colors.moss }} className="block text-sm font-medium mb-2">
                New Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={passwordData.newPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                style={{ backgroundColor: colors.night, borderColor: `${colors.moss}30`, color: colors.pureWhite }}
                className="w-full px-4 py-3 rounded-xl border-2 outline-none"
                placeholder="Enter new password"
              />
            </div>

            <div>
              <label style={{ color: colors.moss }} className="block text-sm font-medium mb-2">
                Confirm New Password
              </label>
              <input
                type={showPassword ? 'text' : 'password'}
                value={passwordData.confirmPassword}
                onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                style={{ backgroundColor: colors.night, borderColor: `${colors.moss}30`, color: colors.pureWhite }}
                className="w-full px-4 py-3 rounded-xl border-2 outline-none"
                placeholder="Confirm new password"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              style={{ backgroundColor: colors.hotOrange }}
              className="px-6 py-3 rounded-xl text-white font-semibold flex items-center space-x-2"
            >
              <Save className="h-5 w-5" />
              <span>{loading ? 'Saving...' : 'Change Password'}</span>
            </button>
          </form>
        </div>

        {/* Danger Zone */}
        <div 
          style={{ backgroundColor: colors.eerieBlack, borderColor: `${colors.hotOrange}50` }}
          className="rounded-2xl border-2 p-6"
        >
          <h2 style={{ color: colors.hotOrange }} className="text-lg font-bold mb-6 flex items-center space-x-2">
            <AlertCircle className="h-5 w-5" />
            <span>Danger Zone</span>
          </h2>

          <div className="space-y-4">
            <div 
              style={{ backgroundColor: colors.night, borderColor: `${colors.hotOrange}30` }}
              className="p-4 rounded-xl border-2 flex items-center justify-between"
            >
              <div>
                <h3 style={{ color: colors.pureWhite }} className="font-medium">
                  Logout
                </h3>
                <p style={{ color: colors.moss }} className="text-sm">
                  Sign out from your account
                </p>
              </div>
              <button
                onClick={logout}
                style={{ backgroundColor: `${colors.hotOrange}20`, color: colors.hotOrange }}
                className="px-4 py-2 rounded-xl font-semibold flex items-center space-x-2"
              >
                <LogOut className="h-5 w-5" />
                <span>Logout</span>
              </button>
            </div>

            <div 
              style={{ backgroundColor: colors.night, borderColor: `${colors.hotOrange}30` }}
              className="p-4 rounded-xl border-2 flex items-center justify-between"
            >
              <div>
                <h3 style={{ color: colors.pureWhite }} className="font-medium">
                  Delete Account
                </h3>
                <p style={{ color: colors.moss }} className="text-sm">
                  Permanently delete your account and all data
                </p>
              </div>
              <button
                onClick={handleDeleteAccount}
                style={{ backgroundColor: colors.hotOrange }}
                className="px-4 py-2 rounded-xl text-white font-semibold flex items-center space-x-2"
              >
                <Trash2 className="h-5 w-5" />
                <span>Delete</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;

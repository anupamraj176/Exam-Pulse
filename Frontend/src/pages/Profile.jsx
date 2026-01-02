import { useState, useEffect } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  Calendar, 
  BookOpen, 
  Award, 
  Edit, 
  Save,
  X,
  Camera,
  Target,
  TrendingUp,
  Clock,
  CheckCircle,
  Star,
  FileText
} from 'lucide-react';
import useAuthStore from '../store/authStore';
import api from '../services/api';
import Loader from '../components/common/Loader';

const Profile = () => {
  const { user, isAuthenticated, updateUser } = useAuthStore();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [editData, setEditData] = useState({});
  const [message, setMessage] = useState({ type: '', text: '' });

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

  const examTargets = [
    'SSC CGL', 'SSC CHSL', 'SSC MTS', 'Banking PO', 'Banking Clerk', 
    'IBPS PO', 'IBPS Clerk', 'SBI PO', 'SBI Clerk', 'Railways RRB',
    'UPSC CSE', 'State PSC', 'Defence CDS', 'Defence NDA'
  ];

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await api.get('/users/profile');
      if (response.data.success) {
        const userData = response.data.data.user || response.data.data;
        setProfileData(userData);
        setEditData({
          name: userData.name || '',
          phone: userData.phone || '',
          avatar: userData.avatar || '',
          targetExams: userData.targetExams || [],
          studyPreferences: userData.studyPreferences || {
            dailyGoalHours: 4,
            preferredSubjects: []
          }
        });
      }
    } catch (error) {
      console.error('Failed to fetch profile:', error);
      // Use local user data as fallback
      if (user) {
        setProfileData(user);
        setEditData({
          name: user.name || '',
          phone: user.phone || '',
          avatar: user.avatar || '',
          targetExams: user.targetExams || [],
          studyPreferences: user.studyPreferences || {
            dailyGoalHours: 4,
            preferredSubjects: []
          }
        });
      }
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTargetExamToggle = (exam) => {
    setEditData(prev => ({
      ...prev,
      targetExams: prev.targetExams.includes(exam)
        ? prev.targetExams.filter(e => e !== exam)
        : [...prev.targetExams, exam]
    }));
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const response = await api.put('/users/profile', editData);
      if (response.data.success) {
        const updatedUser = response.data.data.user || response.data.data;
        setProfileData(updatedUser);
        updateUser(updatedUser);
        setIsEditing(false);
        setMessage({ type: 'success', text: 'Profile updated successfully!' });
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      }
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to update profile' 
      });
    } finally {
      setSaving(false);
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
          <User style={{ color: colors.hotOrange }} className="h-16 w-16 mx-auto mb-4" />
          <h2 style={{ color: colors.pureWhite }} className="text-2xl font-bold mb-2">
            Please Login
          </h2>
          <p style={{ color: colors.moss }} className="mb-4">
            Login to view your profile.
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

  if (loading) {
    return <Loader />;
  }

  const stats = profileData?.stats || {
    resourcesViewed: 0,
    totalStudyTime: 0,
    streak: 0,
    completedTopics: 0
  };

  return (
    <div 
      style={{ backgroundColor: colors.smokyBlack }}
      className="min-h-screen pt-24 pb-12"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Message */}
        {message.text && (
          <div 
            style={{ 
              backgroundColor: message.type === 'success' ? `${colors.moss}20` : `${colors.hotOrange}20`,
              borderColor: message.type === 'success' ? colors.moss : colors.hotOrange,
              color: message.type === 'success' ? colors.moss : colors.hotOrange,
            }}
            className="p-4 rounded-xl border-2 mb-6 flex items-center space-x-3"
          >
            <CheckCircle className="h-5 w-5" />
            <span>{message.text}</span>
          </div>
        )}

        {/* Profile Header */}
        <div 
          style={{ backgroundColor: colors.eerieBlack, borderColor: `${colors.moss}30` }}
          className="rounded-2xl border-2 p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-6 md:space-y-0 md:space-x-8">
            {/* Avatar */}
            <div className="relative">
              <div 
                style={{ 
                  background: `linear-gradient(to bottom right, ${colors.hotOrange}, ${colors.orangeWheel})`,
                }}
                className="w-32 h-32 rounded-full flex items-center justify-center text-4xl font-bold text-white"
              >
                {profileData?.avatar ? (
                  <img 
                    src={profileData.avatar} 
                    alt={profileData.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  profileData?.name?.charAt(0).toUpperCase() || 'U'
                )}
              </div>
              {isEditing && (
                <button
                  style={{ backgroundColor: colors.hotOrange }}
                  className="absolute bottom-0 right-0 p-2 rounded-full"
                >
                  <Camera className="h-4 w-4 text-white" />
                </button>
              )}
            </div>

            {/* Info */}
            <div className="flex-1">
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={editData.name}
                  onChange={handleInputChange}
                  style={{ backgroundColor: colors.night, borderColor: `${colors.moss}30`, color: colors.pureWhite }}
                  className="text-2xl font-bold px-4 py-2 rounded-xl border-2 outline-none w-full md:w-auto mb-4"
                />
              ) : (
                <h1 style={{ color: colors.pureWhite }} className="text-3xl font-bold mb-2">
                  {profileData?.name}
                </h1>
              )}
              
              <div className="space-y-2">
                <p style={{ color: colors.moss }} className="flex items-center space-x-2">
                  <Mail className="h-5 w-5" />
                  <span>{profileData?.email}</span>
                </p>
                {isEditing ? (
                  <div className="flex items-center space-x-2">
                    <Phone style={{ color: colors.moss }} className="h-5 w-5" />
                    <input
                      type="tel"
                      name="phone"
                      value={editData.phone}
                      onChange={handleInputChange}
                      placeholder="Add phone number"
                      style={{ backgroundColor: colors.night, borderColor: `${colors.moss}30`, color: colors.pureWhite }}
                      className="px-4 py-2 rounded-xl border-2 outline-none"
                    />
                  </div>
                ) : (
                  profileData?.phone && (
                    <p style={{ color: colors.moss }} className="flex items-center space-x-2">
                      <Phone className="h-5 w-5" />
                      <span>{profileData.phone}</span>
                    </p>
                  )
                )}
                <p style={{ color: colors.moss }} className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Member since {new Date(profileData?.createdAt || Date.now()).toLocaleDateString()}</span>
                </p>
              </div>
            </div>

            {/* Edit Button */}
            <div>
              {isEditing ? (
                <div className="flex space-x-2">
                  <button
                    onClick={handleSave}
                    disabled={saving}
                    style={{ backgroundColor: colors.moss }}
                    className="px-4 py-2 rounded-xl text-white font-semibold flex items-center space-x-2"
                  >
                    <Save className="h-5 w-5" />
                    <span>{saving ? 'Saving...' : 'Save'}</span>
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    style={{ backgroundColor: colors.night, borderColor: `${colors.moss}30` }}
                    className="px-4 py-2 rounded-xl border-2 flex items-center space-x-2"
                  >
                    <X style={{ color: colors.moss }} className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  style={{ backgroundColor: colors.hotOrange }}
                  className="px-4 py-2 rounded-xl text-white font-semibold flex items-center space-x-2"
                >
                  <Edit className="h-5 w-5" />
                  <span>Edit Profile</span>
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { icon: BookOpen, label: 'Resources Viewed', value: stats.resourcesViewed || 0, color: colors.hotOrange },
            { icon: Clock, label: 'Study Hours', value: stats.totalStudyTime || 0, color: colors.moss },
            { icon: TrendingUp, label: 'Day Streak', value: stats.streak || 0, color: colors.orangeWheel },
            { icon: CheckCircle, label: 'Topics Completed', value: stats.completedTopics || 0, color: colors.moss },
          ].map((stat, index) => (
            <div
              key={index}
              style={{ backgroundColor: colors.eerieBlack, borderColor: `${colors.moss}30` }}
              className="p-6 rounded-2xl border-2 text-center"
            >
              <stat.icon style={{ color: stat.color }} className="h-8 w-8 mx-auto mb-3" />
              <p style={{ color: colors.pureWhite }} className="text-2xl font-bold mb-1">
                {stat.value}
              </p>
              <p style={{ color: colors.moss }} className="text-sm">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {/* Target Exams */}
        <div 
          style={{ backgroundColor: colors.eerieBlack, borderColor: `${colors.moss}30` }}
          className="rounded-2xl border-2 p-8 mb-8"
        >
          <h2 style={{ color: colors.pureWhite }} className="text-xl font-bold mb-6 flex items-center space-x-2">
            <Target style={{ color: colors.hotOrange }} className="h-6 w-6" />
            <span>Target Exams</span>
          </h2>

          <div className="flex flex-wrap gap-3">
            {isEditing ? (
              examTargets.map(exam => (
                <button
                  key={exam}
                  onClick={() => handleTargetExamToggle(exam)}
                  style={{ 
                    backgroundColor: editData.targetExams.includes(exam) ? colors.hotOrange : colors.night,
                    borderColor: editData.targetExams.includes(exam) ? colors.hotOrange : `${colors.moss}30`,
                    color: editData.targetExams.includes(exam) ? colors.pureWhite : colors.moss,
                  }}
                  className="px-4 py-2 rounded-xl border-2 font-medium transition-all"
                >
                  {exam}
                </button>
              ))
            ) : (
              (profileData?.targetExams || ['SSC CGL']).length > 0 ? (
                (profileData?.targetExams || ['SSC CGL']).map(exam => (
                  <span
                    key={exam}
                    style={{ backgroundColor: `${colors.hotOrange}20`, color: colors.hotOrange }}
                    className="px-4 py-2 rounded-xl font-medium"
                  >
                    {exam}
                  </span>
                ))
              ) : (
                <p style={{ color: colors.moss }}>No target exams selected</p>
              )
            )}
          </div>
        </div>

        {/* Recent Activity */}
        <div 
          style={{ backgroundColor: colors.eerieBlack, borderColor: `${colors.moss}30` }}
          className="rounded-2xl border-2 p-8"
        >
          <h2 style={{ color: colors.pureWhite }} className="text-xl font-bold mb-6 flex items-center space-x-2">
            <FileText style={{ color: colors.hotOrange }} className="h-6 w-6" />
            <span>Recent Activity</span>
          </h2>

          {profileData?.recentActivity?.length > 0 ? (
            <div className="space-y-4">
              {profileData.recentActivity.map((activity, index) => (
                <div 
                  key={index}
                  style={{ backgroundColor: colors.night, borderColor: `${colors.moss}20` }}
                  className="p-4 rounded-xl border-2 flex items-center space-x-4"
                >
                  <div 
                    style={{ backgroundColor: `${colors.hotOrange}20` }}
                    className="p-3 rounded-xl"
                  >
                    <BookOpen style={{ color: colors.hotOrange }} className="h-5 w-5" />
                  </div>
                  <div className="flex-1">
                    <p style={{ color: colors.pureWhite }} className="font-medium">
                      {activity.title || 'Viewed resource'}
                    </p>
                    <p style={{ color: colors.moss }} className="text-sm">
                      {new Date(activity.date).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <BookOpen style={{ color: colors.moss }} className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p style={{ color: colors.moss }}>No recent activity</p>
              <a 
                href="/resources"
                style={{ color: colors.hotOrange }}
                className="text-sm hover:underline"
              >
                Start exploring resources
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;

import { useState, useEffect } from 'react';
import { 
  Upload, 
  FileText, 
  Video, 
  BookOpen, 
  Plus,
  X,
  Check,
  AlertCircle,
  Loader,
  Trash2,
  Edit,
  Eye,
  Filter,
  Search
} from 'lucide-react';
import useAuthStore from '../store/authStore';
import api from '../services/api';

const Admin = () => {
  const { user, isAuthenticated } = useAuthStore();
  const [activeTab, setActiveTab] = useState('upload');
  const [resources, setResources] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });
  
  // Upload form state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'notes',
    category: 'SSC',
    subject: 'math',
    tags: '',
    fileUrl: '',
    thumbnail: '',
    pages: '',
    duration: '',
    isFeatured: false,
    isTrending: false,
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

  const resourceTypes = [
    { id: 'notes', name: 'Notes', icon: FileText },
    { id: 'pyq', name: 'Previous Year Questions', icon: BookOpen },
    { id: 'video', name: 'Video Lecture', icon: Video },
    { id: 'ebook', name: 'E-Book', icon: BookOpen },
  ];

  const categories = [
    'SSC', 'Banking', 'Railways', 'UPSC', 'State PSC', 'Defence', 'Teaching', 'All Exams'
  ];

  const subjects = [
    { id: 'math', name: 'Mathematics' },
    { id: 'reasoning', name: 'Reasoning' },
    { id: 'english', name: 'English' },
    { id: 'gk', name: 'General Knowledge' },
    { id: 'science', name: 'Science' },
    { id: 'polity', name: 'Indian Polity' },
    { id: 'history', name: 'History' },
    { id: 'geography', name: 'Geography' },
    { id: 'economy', name: 'Economy' },
    { id: 'computer', name: 'Computer' },
    { id: 'current-affairs', name: 'Current Affairs' },
  ];

  // Fetch resources
  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const response = await api.get('/resources?limit=100');
      if (response.data.success) {
        setResources(response.data.data.resources);
      }
    } catch (error) {
      console.error('Failed to fetch resources:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage({ type: '', text: '' });

    try {
      const payload = {
        ...formData,
        tags: formData.tags.split(',').map(t => t.trim()).filter(Boolean),
        pages: formData.pages ? parseInt(formData.pages) : undefined,
      };

      const response = await api.post('/resources', payload);
      
      if (response.data.success) {
        setMessage({ type: 'success', text: 'Resource uploaded successfully!' });
        setFormData({
          title: '',
          description: '',
          type: 'notes',
          category: 'SSC',
          subject: 'math',
          tags: '',
          fileUrl: '',
          thumbnail: '',
          pages: '',
          duration: '',
          isFeatured: false,
          isTrending: false,
        });
        fetchResources();
      }
    } catch (error) {
      setMessage({ 
        type: 'error', 
        text: error.response?.data?.message || 'Failed to upload resource' 
      });
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (resourceId) => {
    if (!window.confirm('Are you sure you want to delete this resource?')) return;
    
    try {
      await api.delete(`/resources/${resourceId}`);
      setMessage({ type: 'success', text: 'Resource deleted successfully!' });
      fetchResources();
    } catch (error) {
      setMessage({ type: 'error', text: 'Failed to delete resource' });
    }
  };

  // Check if user is admin
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
          <AlertCircle style={{ color: colors.hotOrange }} className="h-16 w-16 mx-auto mb-4" />
          <h2 style={{ color: colors.pureWhite }} className="text-2xl font-bold mb-2">
            Access Denied
          </h2>
          <p style={{ color: colors.moss }} className="mb-4">
            Please login to access the admin panel.
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

  return (
    <div 
      style={{ backgroundColor: colors.smokyBlack }}
      className="min-h-screen pt-24 pb-12"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 style={{ color: colors.pureWhite }} className="text-3xl font-bold mb-2">
            Admin Panel
          </h1>
          <p style={{ color: colors.moss }}>
            Upload and manage study materials
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
            className="p-4 rounded-xl border-2 mb-6 flex items-center space-x-3"
          >
            {message.type === 'success' ? (
              <Check className="h-5 w-5" />
            ) : (
              <AlertCircle className="h-5 w-5" />
            )}
            <span>{message.text}</span>
            <button onClick={() => setMessage({ type: '', text: '' })} className="ml-auto">
              <X className="h-5 w-5" />
            </button>
          </div>
        )}

        {/* Tabs */}
        <div className="flex space-x-4 mb-8">
          {[
            { id: 'upload', name: 'Upload Resource', icon: Upload },
            { id: 'manage', name: 'Manage Resources', icon: FileText },
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                backgroundColor: activeTab === tab.id ? colors.hotOrange : colors.eerieBlack,
                borderColor: activeTab === tab.id ? colors.hotOrange : `${colors.moss}30`,
                color: activeTab === tab.id ? colors.pureWhite : colors.moss,
              }}
              className="flex items-center space-x-2 px-6 py-3 rounded-xl border-2 font-semibold transition-all"
            >
              <tab.icon className="h-5 w-5" />
              <span>{tab.name}</span>
            </button>
          ))}
        </div>

        {/* Upload Form */}
        {activeTab === 'upload' && (
          <div 
            style={{ backgroundColor: colors.eerieBlack, borderColor: `${colors.moss}30` }}
            className="rounded-2xl border-2 p-8"
          >
            <h2 style={{ color: colors.pureWhite }} className="text-xl font-bold mb-6 flex items-center space-x-2">
              <Upload style={{ color: colors.hotOrange }} className="h-6 w-6" />
              <span>Upload New Resource</span>
            </h2>

            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div>
                <label style={{ color: colors.moss }} className="block text-sm font-medium mb-2">
                  Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  style={{ backgroundColor: colors.night, borderColor: `${colors.moss}30`, color: colors.pureWhite }}
                  className="w-full px-4 py-3 rounded-xl border-2 outline-none focus:border-hotOrange"
                  placeholder="e.g., SSC CGL Mathematics Complete Notes"
                />
              </div>

              {/* Description */}
              <div>
                <label style={{ color: colors.moss }} className="block text-sm font-medium mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  style={{ backgroundColor: colors.night, borderColor: `${colors.moss}30`, color: colors.pureWhite }}
                  className="w-full px-4 py-3 rounded-xl border-2 outline-none focus:border-hotOrange resize-none"
                  placeholder="Describe the resource content..."
                />
              </div>

              {/* Type & Category */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label style={{ color: colors.moss }} className="block text-sm font-medium mb-2">
                    Type *
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    style={{ backgroundColor: colors.night, borderColor: `${colors.moss}30`, color: colors.pureWhite }}
                    className="w-full px-4 py-3 rounded-xl border-2 outline-none"
                  >
                    {resourceTypes.map(type => (
                      <option key={type.id} value={type.id}>{type.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label style={{ color: colors.moss }} className="block text-sm font-medium mb-2">
                    Category *
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    style={{ backgroundColor: colors.night, borderColor: `${colors.moss}30`, color: colors.pureWhite }}
                    className="w-full px-4 py-3 rounded-xl border-2 outline-none"
                  >
                    {categories.map(cat => (
                      <option key={cat} value={cat}>{cat}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Subject */}
              <div>
                <label style={{ color: colors.moss }} className="block text-sm font-medium mb-2">
                  Subject *
                </label>
                <select
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  style={{ backgroundColor: colors.night, borderColor: `${colors.moss}30`, color: colors.pureWhite }}
                  className="w-full px-4 py-3 rounded-xl border-2 outline-none"
                >
                  {subjects.map(sub => (
                    <option key={sub.id} value={sub.id}>{sub.name}</option>
                  ))}
                </select>
              </div>

              {/* File URL */}
              <div>
                <label style={{ color: colors.moss }} className="block text-sm font-medium mb-2">
                  File URL (PDF/Video Link) *
                </label>
                <input
                  type="url"
                  name="fileUrl"
                  value={formData.fileUrl}
                  onChange={handleInputChange}
                  required
                  style={{ backgroundColor: colors.night, borderColor: `${colors.moss}30`, color: colors.pureWhite }}
                  className="w-full px-4 py-3 rounded-xl border-2 outline-none"
                  placeholder="https://drive.google.com/file/... or Cloudinary URL"
                />
                <p style={{ color: colors.moss }} className="text-xs mt-1">
                  Upload to Google Drive, Cloudinary, or any cloud storage and paste the link
                </p>
              </div>

              {/* Thumbnail URL */}
              <div>
                <label style={{ color: colors.moss }} className="block text-sm font-medium mb-2">
                  Thumbnail URL (optional)
                </label>
                <input
                  type="url"
                  name="thumbnail"
                  value={formData.thumbnail}
                  onChange={handleInputChange}
                  style={{ backgroundColor: colors.night, borderColor: `${colors.moss}30`, color: colors.pureWhite }}
                  className="w-full px-4 py-3 rounded-xl border-2 outline-none"
                  placeholder="https://example.com/thumbnail.jpg"
                />
              </div>

              {/* Tags */}
              <div>
                <label style={{ color: colors.moss }} className="block text-sm font-medium mb-2">
                  Tags (comma separated)
                </label>
                <input
                  type="text"
                  name="tags"
                  value={formData.tags}
                  onChange={handleInputChange}
                  style={{ backgroundColor: colors.night, borderColor: `${colors.moss}30`, color: colors.pureWhite }}
                  className="w-full px-4 py-3 rounded-xl border-2 outline-none"
                  placeholder="e.g., Algebra, Geometry, Shortcuts"
                />
              </div>

              {/* Pages/Duration */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label style={{ color: colors.moss }} className="block text-sm font-medium mb-2">
                    Pages (for PDFs)
                  </label>
                  <input
                    type="number"
                    name="pages"
                    value={formData.pages}
                    onChange={handleInputChange}
                    style={{ backgroundColor: colors.night, borderColor: `${colors.moss}30`, color: colors.pureWhite }}
                    className="w-full px-4 py-3 rounded-xl border-2 outline-none"
                    placeholder="e.g., 120"
                  />
                </div>

                <div>
                  <label style={{ color: colors.moss }} className="block text-sm font-medium mb-2">
                    Duration (for Videos)
                  </label>
                  <input
                    type="text"
                    name="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    style={{ backgroundColor: colors.night, borderColor: `${colors.moss}30`, color: colors.pureWhite }}
                    className="w-full px-4 py-3 rounded-xl border-2 outline-none"
                    placeholder="e.g., 2 hours 30 minutes"
                  />
                </div>
              </div>

              {/* Checkboxes */}
              <div className="flex items-center space-x-6">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isFeatured"
                    checked={formData.isFeatured}
                    onChange={handleInputChange}
                    className="w-5 h-5 rounded"
                  />
                  <span style={{ color: colors.moss }}>Featured Resource</span>
                </label>

                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="isTrending"
                    checked={formData.isTrending}
                    onChange={handleInputChange}
                    className="w-5 h-5 rounded"
                  />
                  <span style={{ color: colors.moss }}>Trending Resource</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                style={{ background: `linear-gradient(to right, ${colors.hotOrange}, ${colors.orangeWheel})` }}
                className="w-full py-4 rounded-xl text-white font-bold text-lg flex items-center justify-center space-x-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <Loader className="h-5 w-5 animate-spin" />
                    <span>Uploading...</span>
                  </>
                ) : (
                  <>
                    <Upload className="h-5 w-5" />
                    <span>Upload Resource</span>
                  </>
                )}
              </button>
            </form>
          </div>
        )}

        {/* Manage Resources */}
        {activeTab === 'manage' && (
          <div 
            style={{ backgroundColor: colors.eerieBlack, borderColor: `${colors.moss}30` }}
            className="rounded-2xl border-2 p-8"
          >
            <h2 style={{ color: colors.pureWhite }} className="text-xl font-bold mb-6">
              All Resources ({resources.length})
            </h2>

            {resources.length === 0 ? (
              <div className="text-center py-12">
                <FileText style={{ color: colors.moss }} className="h-16 w-16 mx-auto mb-4 opacity-50" />
                <p style={{ color: colors.moss }}>No resources uploaded yet</p>
              </div>
            ) : (
              <div className="space-y-4">
                {resources.map(resource => (
                  <div
                    key={resource._id}
                    style={{ backgroundColor: colors.night, borderColor: `${colors.moss}20` }}
                    className="p-4 rounded-xl border-2 flex items-center justify-between"
                  >
                    <div className="flex-1">
                      <h3 style={{ color: colors.pureWhite }} className="font-semibold mb-1">
                        {resource.title}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm">
                        <span style={{ color: colors.moss }}>{resource.type}</span>
                        <span style={{ color: colors.moss }}>•</span>
                        <span style={{ color: colors.moss }}>{resource.category}</span>
                        <span style={{ color: colors.moss }}>•</span>
                        <span style={{ color: colors.moss }}>{resource.stats?.views || 0} views</span>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {resource.fileUrl && (
                        <a
                          href={resource.fileUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ backgroundColor: `${colors.moss}20`, color: colors.moss }}
                          className="p-2 rounded-lg"
                        >
                          <Eye className="h-5 w-5" />
                        </a>
                      )}
                      <button
                        onClick={() => handleDelete(resource._id)}
                        style={{ backgroundColor: `${colors.hotOrange}20`, color: colors.hotOrange }}
                        className="p-2 rounded-lg"
                      >
                        <Trash2 className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;

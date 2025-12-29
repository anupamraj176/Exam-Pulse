import { useState } from 'react';
import { 
  Users, 
  MessageCircle, 
  Send,
  Video,
  Mic,
  MicOff,
  VideoOff,
  Search,
  Plus,
  Radio,
  Crown,
  Settings,
  UserPlus,
  Lock,
  Globe,
  Clock,
  TrendingUp,
  Award,
  Filter,
  X
} from 'lucide-react';

const StudyRooms = () => {
  const [activeRoom, setActiveRoom] = useState(null);
  const [message, setMessage] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

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

  const studyRooms = [
    {
      id: 1,
      name: 'SSC CGL 2025 Preparation',
      category: 'SSC',
      icon: '📋',
      activeUsers: 45,
      totalMembers: 234,
      isLive: true,
      lastActive: 'now',
      description: 'Dedicated group for SSC CGL 2025 aspirants. Daily discussions and doubt solving.',
      privacy: 'public',
      trending: true,
      moderator: 'Rajesh Kumar',
    },
    {
      id: 2,
      name: 'Banking Exams Discussion',
      category: 'Banking',
      icon: '🏦',
      activeUsers: 32,
      totalMembers: 189,
      isLive: true,
      lastActive: 'now',
      description: 'For IBPS, SBI, and other banking exam preparations. Share tips and strategies.',
      privacy: 'public',
      trending: true,
      moderator: 'Priya Sharma',
    },
    {
      id: 3,
      name: 'Mathematics Study Group',
      category: 'Subject',
      icon: '🔢',
      activeUsers: 28,
      totalMembers: 156,
      isLive: true,
      lastActive: 'now',
      description: 'Practice and discuss mathematical concepts, shortcuts, and problem-solving.',
      privacy: 'public',
      trending: false,
      moderator: 'Amit Verma',
    },
    {
      id: 4,
      name: 'UPSC CSE Aspirants Hub',
      category: 'UPSC',
      icon: '🎯',
      activeUsers: 56,
      totalMembers: 421,
      isLive: true,
      lastActive: 'now',
      description: 'Civil Services Exam preparation - Prelims, Mains, and Interview guidance.',
      privacy: 'public',
      trending: true,
      moderator: 'Sneha Gupta',
    },
    {
      id: 5,
      name: 'English Language Mastery',
      category: 'Subject',
      icon: '📚',
      activeUsers: 19,
      totalMembers: 98,
      isLive: true,
      lastActive: 'now',
      description: 'Improve grammar, vocabulary, and comprehension skills together.',
      privacy: 'public',
      trending: false,
      moderator: 'Vikram Singh',
    },
    {
      id: 6,
      name: 'Railway Exam Warriors',
      category: 'Railways',
      icon: '🚂',
      activeUsers: 23,
      totalMembers: 167,
      isLive: false,
      lastActive: '5m ago',
      description: 'RRB NTPC, Group D, and other railway exam preparations.',
      privacy: 'public',
      trending: false,
      moderator: 'Rahul Joshi',
    },
  ];

  const messages = [
    {
      id: 1,
      user: 'Rajesh Kumar',
      avatar: 'RK',
      message: 'Good morning everyone! Ready for today\'s study session?',
      time: '09:00 AM',
      isModerator: true,
    },
    {
      id: 2,
      user: 'Ankit Sharma',
      avatar: 'AS',
      message: 'Yes! Can we discuss quantitative aptitude today?',
      time: '09:02 AM',
      isModerator: false,
    },
    {
      id: 3,
      user: 'Priya Singh',
      avatar: 'PS',
      message: 'I have some doubts in number system. Can someone help?',
      time: '09:05 AM',
      isModerator: false,
    },
    {
      id: 4,
      user: 'Rajesh Kumar',
      avatar: 'RK',
      message: 'Sure! Let\'s start with number system fundamentals. Share your specific questions.',
      time: '09:06 AM',
      isModerator: true,
    },
  ];

  const onlineUsers = [
    { name: 'Rajesh Kumar', avatar: 'RK', status: 'active', isModerator: true },
    { name: 'Ankit Sharma', avatar: 'AS', status: 'active', isModerator: false },
    { name: 'Priya Singh', avatar: 'PS', status: 'active', isModerator: false },
    { name: 'Vikram Gupta', avatar: 'VG', status: 'idle', isModerator: false },
    { name: 'Meera Reddy', avatar: 'MR', status: 'active', isModerator: false },
  ];

  const filteredRooms = studyRooms.filter(room => {
    const matchesSearch = room.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         room.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || room.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = [
    { id: 'all', name: 'All Rooms' },
    { id: 'SSC', name: 'SSC' },
    { id: 'Banking', name: 'Banking' },
    { id: 'Railways', name: 'Railways' },
    { id: 'UPSC', name: 'UPSC' },
    { id: 'Subject', name: 'Subject-wise' },
  ];

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
            <MessageCircle style={{ color: colors.hotOrange }} className="h-6 w-6" />
            <span 
              style={{ color: colors.moss }}
              className="text-sm font-semibold uppercase tracking-wider"
            >
              Study Rooms
            </span>
          </div>
          <h1 
            style={{ color: colors.pureWhite }}
            className="text-4xl lg:text-5xl font-display font-bold mb-4"
          >
            Live Study Rooms
          </h1>
          <p 
            style={{ color: colors.moss }}
            className="text-lg max-w-2xl mb-6"
          >
            Join thousands of students in real-time study sessions. Collaborate, discuss, and learn together!
          </p>

          <button
            style={{
              background: `linear-gradient(to right, ${colors.hotOrange}, ${colors.orangeWheel})`,
              color: colors.pureWhite,
            }}
            className="inline-flex items-center space-x-2 px-6 py-3 rounded-xl font-semibold transition-all duration-200"
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.05)';
              e.currentTarget.style.boxShadow = `0 10px 30px ${colors.hotOrange}40`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            <Plus className="h-5 w-5" />
            <span>Create New Room</span>
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {!activeRoom ? (
          <>
            {/* Search and Filters */}
            <div className="mb-8">
              <div className="flex flex-col md:flex-row gap-4 mb-4">
                {/* Search */}
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
                    placeholder="Search study rooms..."
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
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                </div>
              </div>

              {/* Category Filters */}
              <div className="flex items-center space-x-3 overflow-x-auto pb-2">
                <Filter style={{ color: colors.moss }} className="h-5 w-5 flex-shrink-0" />
                {categories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setFilterCategory(category.id)}
                    style={{
                      backgroundColor: filterCategory === category.id ? colors.eerieBlack : 'transparent',
                      borderColor: filterCategory === category.id ? colors.hotOrange : `${colors.moss}30`,
                      color: filterCategory === category.id ? colors.hotOrange : colors.moss,
                      background: filterCategory === category.id 
                        ? `linear-gradient(to right, ${colors.hotOrange}20, ${colors.orangeWheel}20)` 
                        : 'transparent',
                    }}
                    className="px-5 py-2 rounded-lg border-2 font-medium whitespace-nowrap transition-all duration-200"
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Study Rooms Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredRooms.map((room) => (
                <div
                  key={room.id}
                  style={{
                    backgroundColor: colors.eerieBlack,
                    borderColor: room.isLive ? colors.hotOrange : `${colors.moss}20`,
                  }}
                  className="rounded-2xl border-2 p-6 transition-all duration-300 group hover:shadow-2xl cursor-pointer"
                  onClick={() => setActiveRoom(room)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.borderColor = colors.hotOrange;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = room.isLive ? colors.hotOrange : `${colors.moss}20`;
                  }}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="text-4xl">{room.icon}</div>
                    <div className="flex flex-col items-end space-y-2">
                      {room.isLive && (
                        <div 
                          style={{
                            backgroundColor: `${colors.hotOrange}20`,
                            color: colors.hotOrange,
                          }}
                          className="flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-bold animate-pulse"
                        >
                          <Radio className="h-3 w-3" />
                          <span>LIVE</span>
                        </div>
                      )}
                      {room.trending && (
                        <div 
                          style={{
                            backgroundColor: `${colors.orangeWheel}20`,
                            color: colors.orangeWheel,
                          }}
                          className="flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-bold"
                        >
                          <TrendingUp className="h-3 w-3" />
                          <span>Trending</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Room Name & Category */}
                  <h3 
                    style={{ color: colors.pureWhite }}
                    className="text-xl font-bold mb-2"
                  >
                    {room.name}
                  </h3>
                  <span
                    style={{
                      backgroundColor: `${colors.moss}20`,
                      color: colors.moss,
                    }}
                    className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-3"
                  >
                    {room.category}
                  </span>

                  {/* Description */}
                  <p 
                    style={{ color: colors.moss }}
                    className="text-sm mb-4 line-clamp-2"
                  >
                    {room.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Users 
                          style={{ color: colors.hotOrange }}
                          className="h-4 w-4"
                        />
                        <span 
                          style={{ color: colors.pureWhite }}
                          className="text-sm font-semibold"
                        >
                          {room.activeUsers}
                        </span>
                        <span 
                          style={{ color: colors.moss }}
                          className="text-xs"
                        >
                          online
                        </span>
                      </div>

                      <div className="flex items-center space-x-1">
                        <Award 
                          style={{ color: colors.orangeWheel }}
                          className="h-4 w-4"
                        />
                        <span 
                          style={{ color: colors.moss }}
                          className="text-xs"
                        >
                          {room.totalMembers} members
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Moderator */}
                  <div 
                    style={{ borderTopColor: `${colors.moss}20` }}
                    className="pt-4 border-t flex items-center justify-between"
                  >
                    <div className="flex items-center space-x-2">
                      <Crown 
                        style={{ color: colors.orangeWheel }}
                        className="h-4 w-4"
                      />
                      <span 
                        style={{ color: colors.moss }}
                        className="text-xs"
                      >
                        Mod: {room.moderator}
                      </span>
                    </div>

                    {room.privacy === 'public' ? (
                      <Globe 
                        style={{ color: colors.moss }}
                        className="h-4 w-4"
                      />
                    ) : (
                      <Lock 
                        style={{ color: colors.moss }}
                        className="h-4 w-4"
                      />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        ) : (
          // Active Room Chat Interface
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            
            {/* Main Chat Area - 3/4 width */}
            <div className="lg:col-span-3">
              <div
                style={{
                  backgroundColor: colors.eerieBlack,
                  borderColor: `${colors.hotOrange}30`,
                }}
                className="rounded-2xl border-2 overflow-hidden"
              >
                {/* Chat Header */}
                <div 
                  style={{
                    background: `linear-gradient(to right, ${colors.night}, ${colors.eerieBlack})`,
                    borderBottomColor: `${colors.moss}20`,
                  }}
                  className="p-4 border-b-2"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <button
                        onClick={() => setActiveRoom(null)}
                        style={{
                          backgroundColor: colors.smokyBlack,
                          color: colors.moss,
                        }}
                        className="p-2 rounded-lg hover:text-hotOrange transition-colors"
                      >
                        <X className="h-5 w-5" />
                      </button>
                      <div className="text-3xl">{activeRoom.icon}</div>
                      <div>
                        <h3 
                          style={{ color: colors.pureWhite }}
                          className="text-lg font-bold"
                        >
                          {activeRoom.name}
                        </h3>
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1">
                            <Radio 
                              style={{ color: colors.hotOrange }}
                              className="h-3 w-3 animate-pulse"
                            />
                            <span 
                              style={{ color: colors.moss }}
                              className="text-xs"
                            >
                              {activeRoom.activeUsers} online
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        style={{
                          backgroundColor: colors.smokyBlack,
                          color: colors.moss,
                        }}
                        className="p-2 rounded-lg hover:text-hotOrange transition-colors"
                      >
                        <Mic className="h-5 w-5" />
                      </button>
                      <button
                        style={{
                          backgroundColor: colors.smokyBlack,
                          color: colors.moss,
                        }}
                        className="p-2 rounded-lg hover:text-hotOrange transition-colors"
                      >
                        <Video className="h-5 w-5" />
                      </button>
                      <button
                        style={{
                          backgroundColor: colors.smokyBlack,
                          color: colors.moss,
                        }}
                        className="p-2 rounded-lg hover:text-hotOrange transition-colors"
                      >
                        <Settings className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Messages Area */}
                <div 
                  style={{ backgroundColor: colors.smokyBlack }}
                  className="h-[500px] overflow-y-auto p-6 space-y-4"
                >
                  {messages.map((msg) => (
                    <div key={msg.id} className="flex items-start space-x-3">
                      <div 
                        style={{
                          background: msg.isModerator 
                            ? `linear-gradient(to bottom right, ${colors.hotOrange}, ${colors.orangeWheel})` 
                            : colors.eerieBlack,
                          color: colors.pureWhite,
                        }}
                        className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
                      >
                        {msg.avatar}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-1">
                          <span 
                            style={{ color: colors.pureWhite }}
                            className="text-sm font-semibold"
                          >
                            {msg.user}
                          </span>
                          {msg.isModerator && (
                            <Crown 
                              style={{ color: colors.orangeWheel }}
                              className="h-3 w-3"
                            />
                          )}
                          <span 
                            style={{ color: colors.moss }}
                            className="text-xs"
                          >
                            {msg.time}
                          </span>
                        </div>
                        <p 
                          style={{ color: colors.moss }}
                          className="text-sm"
                        >
                          {msg.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <div 
                  style={{
                    borderTopColor: `${colors.moss}20`,
                  }}
                  className="p-4 border-t-2"
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="text"
                      placeholder="Type your message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      style={{
                        backgroundColor: colors.smokyBlack,
                        borderColor: `${colors.moss}30`,
                        color: colors.pureWhite,
                      }}
                      className="flex-1 px-4 py-3 rounded-xl border-2 outline-none text-sm focus:border-hotOrange transition-colors"
                    />
                    <button
                      style={{
                        background: `linear-gradient(to right, ${colors.hotOrange}, ${colors.orangeWheel})`,
                        color: colors.pureWhite,
                      }}
                      className="p-3 rounded-xl transition-all duration-200"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.1)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)';
                      }}
                    >
                      <Send className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar - 1/4 width */}
            <div className="space-y-6">
              
              {/* Online Users */}
              <div
                style={{
                  backgroundColor: colors.eerieBlack,
                  borderColor: `${colors.moss}20`,
                }}
                className="rounded-2xl border-2 p-6"
              >
                <h3 
                  style={{ color: colors.pureWhite }}
                  className="text-lg font-bold mb-4 flex items-center space-x-2"
                >
                  <Users style={{ color: colors.hotOrange }} className="h-5 w-5" />
                  <span>Online ({onlineUsers.length})</span>
                </h3>

                <div className="space-y-3">
                  {onlineUsers.map((user, index) => (
                    <div 
                      key={index}
                      className="flex items-center space-x-3"
                    >
                      <div className="relative">
                        <div 
                          style={{
                            background: user.isModerator 
                              ? `linear-gradient(to bottom right, ${colors.hotOrange}, ${colors.orangeWheel})` 
                              : colors.smokyBlack,
                            color: colors.pureWhite,
                          }}
                          className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold"
                        >
                          {user.avatar}
                        </div>
                        <div 
                          className="absolute bottom-0 right-0 w-3 h-3 rounded-full border-2"
                          style={{
                            borderColor: colors.eerieBlack,
                            backgroundColor: user.status === 'active' ? colors.moss : colors.orangeWheel,
                          }}
                        ></div>
                      </div>
                      <div className="flex-1">
                        <p 
                          style={{ color: colors.pureWhite }}
                          className="text-sm font-medium"
                        >
                          {user.name}
                        </p>
                        {user.isModerator && (
                          <div className="flex items-center space-x-1">
                            <Crown 
                              style={{ color: colors.orangeWheel }}
                              className="h-3 w-3"
                            />
                            <span 
                              style={{ color: colors.moss }}
                              className="text-xs"
                            >
                              Moderator
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  style={{
                    backgroundColor: colors.smokyBlack,
                    borderColor: `${colors.moss}30`,
                    color: colors.moss,
                  }}
                  className="w-full mt-4 py-2 rounded-lg border-2 text-sm font-semibold flex items-center justify-center space-x-2 hover:border-hotOrange hover:text-hotOrange transition-all duration-200"
                >
                  <UserPlus className="h-4 w-4" />
                  <span>Invite Friends</span>
                </button>
              </div>

              {/* Room Info */}
              <div
                style={{
                  backgroundColor: colors.eerieBlack,
                  borderColor: `${colors.moss}20`,
                }}
                className="rounded-2xl border-2 p-6"
              >
                <h3 
                  style={{ color: colors.pureWhite }}
                  className="text-lg font-bold mb-4"
                >
                  Room Info
                </h3>

                <div className="space-y-3">
                  <div>
                    <span 
                      style={{ color: colors.moss }}
                      className="text-xs"
                    >
                      Category
                    </span>
                    <p 
                      style={{ color: colors.pureWhite }}
                      className="text-sm font-semibold"
                    >
                      {activeRoom.category}
                    </p>
                  </div>

                  <div>
                    <span 
                      style={{ color: colors.moss }}
                      className="text-xs"
                    >
                      Total Members
                    </span>
                    <p 
                      style={{ color: colors.pureWhite }}
                      className="text-sm font-semibold"
                    >
                      {activeRoom.totalMembers}
                    </p>
                  </div>

                  <div>
                    <span 
                      style={{ color: colors.moss }}
                      className="text-xs"
                    >
                      Privacy
                    </span>
                    <p 
                      style={{ color: colors.pureWhite }}
                      className="text-sm font-semibold capitalize"
                    >
                      {activeRoom.privacy}
                    </p>
                  </div>

                  <div>
                    <span 
                      style={{ color: colors.moss }}
                      className="text-xs"
                    >
                      Moderator
                    </span>
                    <p 
                      style={{ color: colors.pureWhite }}
                      className="text-sm font-semibold"
                    >
                      {activeRoom.moderator}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudyRooms;

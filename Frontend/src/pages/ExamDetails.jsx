import { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Calendar,
  Clock,
  Users,
  BookOpen,
  FileText,
  Award,
  DollarSign,
  MapPin,
  CheckCircle,
  AlertCircle,
  Download,
  ExternalLink,
  TrendingUp,
  Target,
  Info,
  ChevronRight,
  Bell,
  Bookmark,
  Share2
} from 'lucide-react';

const ExamDetail = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [isBookmarked, setIsBookmarked] = useState(false);

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

  // Mock exam data - In real app, this would come from route params and API
  const examData = {
    name: 'SSC CGL',
    fullName: 'Staff Selection Commission - Combined Graduate Level',
    icon: '📋',
    category: 'Central Government',
    description: 'One of the most sought-after government exams in India for graduates seeking posts in various ministries and departments.',
    
    keyDates: [
      { label: 'Notification Release', date: '2025-01-15', status: 'upcoming' },
      { label: 'Application Start', date: '2025-01-20', status: 'upcoming' },
      { label: 'Application End', date: '2025-02-20', status: 'upcoming' },
      { label: 'Admit Card', date: '2025-07-15', status: 'upcoming' },
      { label: 'Tier 1 Exam', date: '2025-08-15', status: 'upcoming' },
      { label: 'Result Declaration', date: '2025-09-30', status: 'upcoming' },
    ],

    examPattern: {
      tiers: [
        {
          name: 'Tier 1',
          type: 'Computer Based Test',
          duration: '60 minutes',
          sections: [
            { name: 'General Intelligence & Reasoning', questions: 25, marks: 50 },
            { name: 'General Awareness', questions: 25, marks: 50 },
            { name: 'Quantitative Aptitude', questions: 25, marks: 50 },
            { name: 'English Comprehension', questions: 25, marks: 50 },
          ],
          totalQuestions: 100,
          totalMarks: 200,
          negativeMarking: '0.50 marks for each wrong answer',
        },
        {
          name: 'Tier 2',
          type: 'Computer Based Test',
          duration: '2 hours per paper',
          sections: [
            { name: 'Paper I: Quantitative Abilities', questions: 100, marks: 200 },
            { name: 'Paper II: English Language', questions: 200, marks: 200 },
            { name: 'Paper III: Statistics', questions: 100, marks: 200 },
            { name: 'Paper IV: General Studies', questions: 100, marks: 200 },
          ],
          totalQuestions: 500,
          totalMarks: 800,
          negativeMarking: '0.50 marks for each wrong answer',
        },
      ],
    },

    eligibility: {
      ageLimit: '18-32 years (Relaxation for reserved categories)',
      qualification: 'Bachelor\'s Degree from a recognized university',
      nationality: 'Indian Citizen',
    },

    vacancies: 17727,
    applicationFee: {
      general: '₹100',
      femaleScStObc: 'No fee',
    },

    syllabus: [
      {
        subject: 'General Intelligence & Reasoning',
        topics: [
          'Analogies', 'Similarities & Differences', 'Space Visualization',
          'Problem Solving', 'Analysis & Judgment', 'Decision Making',
          'Visual Memory', 'Discrimination', 'Observation', 'Relationship',
          'Arithmetical Reasoning', 'Verbal & Figure Classification'
        ],
      },
      {
        subject: 'General Awareness',
        topics: [
          'Indian History', 'Culture', 'Geography', 'Economic Scene',
          'General Polity', 'Indian Constitution', 'Scientific Research',
          'Current Affairs', 'Books & Authors', 'Sports', 'Awards & Honors'
        ],
      },
      {
        subject: 'Quantitative Aptitude',
        topics: [
          'Number Systems', 'Simplification', 'Decimals & Fractions',
          'LCM & HCF', 'Ratio & Proportion', 'Percentage', 'Average',
          'Profit & Loss', 'Discount', 'Simple & Compound Interest',
          'Time & Work', 'Time & Distance', 'Mensuration', 'Trigonometry',
          'Algebra', 'Geometry', 'Data Interpretation'
        ],
      },
      {
        subject: 'English Comprehension',
        topics: [
          'Vocabulary', 'Grammar', 'Sentence Structure',
          'Synonyms & Antonyms', 'Spelling', 'Idioms & Phrases',
          'One Word Substitution', 'Error Spotting',
          'Fill in the Blanks', 'Reading Comprehension'
        ],
      },
    ],

    posts: [
      { name: 'Assistant', grade: 'Grade Pay 4200', count: 8000 },
      { name: 'Inspector', grade: 'Grade Pay 4600', count: 3500 },
      { name: 'Tax Assistant', grade: 'Grade Pay 4200', count: 2800 },
      { name: 'Auditor', grade: 'Grade Pay 4200', count: 1500 },
      { name: 'Junior Statistical Officer', grade: 'Grade Pay 4600', count: 927 },
      { name: 'Other Posts', grade: 'Various', count: 1000 },
    ],

    importantLinks: [
      { name: 'Official Website', url: 'https://ssc.nic.in', icon: ExternalLink },
      { name: 'Detailed Notification', url: '#', icon: FileText },
      { name: 'Apply Online', url: '#', icon: CheckCircle },
      { name: 'Previous Year Papers', url: '/pyq', icon: Download },
    ],
  };

  const stats = [
    {
      label: 'Total Vacancies',
      value: examData.vacancies.toLocaleString(),
      icon: Users,
      color: colors.hotOrange,
    },
    {
      label: 'Active Aspirants',
      value: '2.3k+',
      icon: TrendingUp,
      color: colors.orangeWheel,
    },
    {
      label: 'Study Materials',
      value: '150+',
      icon: BookOpen,
      color: colors.moss,
    },
    {
      label: 'Success Rate',
      value: '12.5%',
      icon: Award,
      color: colors.hotOrange,
    },
  ];

  const tabs = [
    { id: 'overview', name: 'Overview', icon: Info },
    { id: 'pattern', name: 'Exam Pattern', icon: FileText },
    { id: 'syllabus', name: 'Syllabus', icon: BookOpen },
    { id: 'dates', name: 'Important Dates', icon: Calendar },
  ];

  return (
    <div 
      style={{ backgroundColor: colors.smokyBlack }}
      className="min-h-screen pt-20"
    >
      {/* Hero Section */}
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
              background: `radial-gradient(circle at 30% 50%, ${colors.hotOrange}15 0%, transparent 50%)`,
            }}
            className="absolute top-0 left-0 w-96 h-96 blur-3xl"
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-8">
            <div className="flex items-start space-x-4 mb-4 md:mb-0">
              <div 
                style={{
                  background: `linear-gradient(135deg, ${colors.hotOrange}20, ${colors.orangeWheel}20)`,
                }}
                className="w-20 h-20 rounded-2xl flex items-center justify-center text-4xl"
              >
                {examData.icon}
              </div>
              <div>
                <div className="flex items-center space-x-2 mb-2">
                  <h1 
                    style={{ color: colors.pureWhite }}
                    className="text-3xl lg:text-4xl font-display font-bold"
                  >
                    {examData.name}
                  </h1>
                  <div 
                    style={{
                      backgroundColor: `${colors.hotOrange}20`,
                      color: colors.hotOrange,
                    }}
                    className="px-3 py-1 rounded-full text-xs font-bold"
                  >
                    TRENDING
                  </div>
                </div>
                <p 
                  style={{ color: colors.pureWhite }}
                  className="text-lg font-semibold mb-2"
                >
                  {examData.fullName}
                </p>
                <div className="flex items-center space-x-4 text-sm">
                  <span
                    style={{
                      backgroundColor: `${colors.moss}20`,
                      color: colors.moss,
                    }}
                    className="px-3 py-1 rounded-full font-medium"
                  >
                    {examData.category}
                  </span>
                  <div className="flex items-center space-x-1">
                    <Users 
                      style={{ color: colors.moss }}
                      className="h-4 w-4"
                    />
                    <span style={{ color: colors.moss }}>
                      2.3k+ studying
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsBookmarked(!isBookmarked)}
                style={{
                  backgroundColor: isBookmarked ? `${colors.hotOrange}20` : colors.eerieBlack,
                  borderColor: isBookmarked ? colors.hotOrange : `${colors.moss}30`,
                  color: isBookmarked ? colors.hotOrange : colors.moss,
                }}
                className="p-3 rounded-lg border-2 transition-all duration-200"
              >
                <Bookmark 
                  className={`h-5 w-5 ${isBookmarked ? 'fill-current' : ''}`}
                />
              </button>
              <button
                style={{
                  backgroundColor: colors.eerieBlack,
                  borderColor: `${colors.moss}30`,
                  color: colors.moss,
                }}
                className="p-3 rounded-lg border-2 transition-all duration-200 hover:border-hotOrange hover:text-hotOrange"
              >
                <Share2 className="h-5 w-5" />
              </button>
              <button
                style={{
                  background: `linear-gradient(to right, ${colors.hotOrange}, ${colors.orangeWheel})`,
                  color: colors.pureWhite,
                }}
                className="px-6 py-3 rounded-lg font-semibold flex items-center space-x-2 transition-all duration-200"
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              >
                <Bell className="h-5 w-5" />
                <span>Get Notifications</span>
              </button>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  style={{
                    backgroundColor: `${colors.eerieBlack}80`,
                    backdropFilter: 'blur(10px)',
                  }}
                  className="p-4 rounded-xl"
                >
                  <Icon style={{ color: stat.color }} className="h-6 w-6 mb-2" />
                  <p style={{ color: colors.pureWhite }} className="text-2xl font-bold">
                    {stat.value}
                  </p>
                  <p style={{ color: colors.moss }} className="text-sm">
                    {stat.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Tabs */}
        <div className="flex items-center space-x-2 mb-8 overflow-x-auto pb-2">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                style={{
                  backgroundColor: activeTab === tab.id ? colors.eerieBlack : 'transparent',
                  borderColor: activeTab === tab.id ? colors.hotOrange : `${colors.moss}30`,
                  color: activeTab === tab.id ? colors.hotOrange : colors.moss,
                  background: activeTab === tab.id 
                    ? `linear-gradient(to right, ${colors.hotOrange}20, ${colors.orangeWheel}20)` 
                    : 'transparent',
                }}
                className="flex items-center space-x-2 px-6 py-3 rounded-lg border-2 font-medium whitespace-nowrap transition-all duration-200"
              >
                <Icon className="h-4 w-4" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Main Content - 2/3 */}
          <div className="lg:col-span-2 space-y-6">
            
            {activeTab === 'overview' && (
              <>
                <div
                  style={{
                    backgroundColor: colors.eerieBlack,
                    borderColor: `${colors.moss}20`,
                  }}
                  className="rounded-2xl border-2 p-6"
                >
                  <h2 
                    style={{ color: colors.pureWhite }}
                    className="text-2xl font-bold mb-4"
                  >
                    About {examData.name}
                  </h2>
                  <p 
                    style={{ color: colors.moss }}
                    className="text-base leading-relaxed mb-6"
                  >
                    {examData.description}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <Calendar style={{ color: colors.hotOrange }} className="h-5 w-5" />
                        <span style={{ color: colors.moss }} className="text-sm">Age Limit</span>
                      </div>
                      <p style={{ color: colors.pureWhite }} className="font-semibold">
                        {examData.eligibility.ageLimit}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <Award style={{ color: colors.orangeWheel }} className="h-5 w-5" />
                        <span style={{ color: colors.moss }} className="text-sm">Qualification</span>
                      </div>
                      <p style={{ color: colors.pureWhite }} className="font-semibold">
                        {examData.eligibility.qualification}
                      </p>
                    </div>

                    <div>
                      <div className="flex items-center space-x-2 mb-2">
                        <DollarSign style={{ color: colors.moss }} className="h-5 w-5" />
                        <span style={{ color: colors.moss }} className="text-sm">Application Fee</span>
                      </div>
                      <p style={{ color: colors.pureWhite }} className="font-semibold">
                        {examData.applicationFee.general}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Posts & Vacancies */}
                <div
                  style={{
                    backgroundColor: colors.eerieBlack,
                    borderColor: `${colors.moss}20`,
                  }}
                  className="rounded-2xl border-2 p-6"
                >
                  <h2 
                    style={{ color: colors.pureWhite }}
                    className="text-2xl font-bold mb-4"
                  >
                    Posts & Vacancies
                  </h2>

                  <div className="space-y-3">
                    {examData.posts.map((post, index) => (
                      <div
                        key={index}
                        style={{
                          backgroundColor: colors.smokyBlack,
                          borderColor: `${colors.moss}20`,
                        }}
                        className="rounded-xl border p-4 flex items-center justify-between"
                      >
                        <div>
                          <h3 
                            style={{ color: colors.pureWhite }}
                            className="font-semibold mb-1"
                          >
                            {post.name}
                          </h3>
                          <p 
                            style={{ color: colors.moss }}
                            className="text-sm"
                          >
                            {post.grade}
                          </p>
                        </div>
                        <div className="text-right">
                          <p 
                            style={{ color: colors.hotOrange }}
                            className="text-2xl font-bold"
                          >
                            {post.count}
                          </p>
                          <p 
                            style={{ color: colors.moss }}
                            className="text-xs"
                          >
                            vacancies
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}

            {activeTab === 'pattern' && (
              <div
                style={{
                  backgroundColor: colors.eerieBlack,
                  borderColor: `${colors.moss}20`,
                }}
                className="rounded-2xl border-2 p-6"
              >
                <h2 
                  style={{ color: colors.pureWhite }}
                  className="text-2xl font-bold mb-6"
                >
                  Exam Pattern
                </h2>

                <div className="space-y-6">
                  {examData.examPattern.tiers.map((tier, index) => (
                    <div
                      key={index}
                      style={{
                        backgroundColor: colors.smokyBlack,
                        borderColor: `${colors.moss}20`,
                      }}
                      className="rounded-xl border p-6"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <h3 
                          style={{ color: colors.pureWhite }}
                          className="text-xl font-bold"
                        >
                          {tier.name}
                        </h3>
                        <span
                          style={{
                            backgroundColor: `${colors.hotOrange}20`,
                            color: colors.hotOrange,
                          }}
                          className="px-3 py-1 rounded-full text-sm font-semibold"
                        >
                          {tier.type}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-6">
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <Clock style={{ color: colors.orangeWheel }} className="h-4 w-4" />
                            <span style={{ color: colors.moss }} className="text-sm">Duration</span>
                          </div>
                          <p style={{ color: colors.pureWhite }} className="font-semibold">
                            {tier.duration}
                          </p>
                        </div>

                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <Target style={{ color: colors.moss }} className="h-4 w-4" />
                            <span style={{ color: colors.moss }} className="text-sm">Total Marks</span>
                          </div>
                          <p style={{ color: colors.pureWhite }} className="font-semibold">
                            {tier.totalMarks}
                          </p>
                        </div>
                      </div>

                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead>
                            <tr 
                              style={{ borderBottomColor: `${colors.moss}20` }}
                              className="border-b-2"
                            >
                              <th 
                                style={{ color: colors.moss }}
                                className="text-left py-3 text-sm font-semibold"
                              >
                                Section
                              </th>
                              <th 
                                style={{ color: colors.moss }}
                                className="text-center py-3 text-sm font-semibold"
                              >
                                Questions
                              </th>
                              <th 
                                style={{ color: colors.moss }}
                                className="text-center py-3 text-sm font-semibold"
                              >
                                Marks
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {tier.sections.map((section, idx) => (
                              <tr 
                                key={idx}
                                style={{ borderBottomColor: `${colors.moss}10` }}
                                className="border-b"
                              >
                                <td 
                                  style={{ color: colors.pureWhite }}
                                  className="py-3 text-sm"
                                >
                                  {section.name}
                                </td>
                                <td 
                                  style={{ color: colors.pureWhite }}
                                  className="text-center py-3 text-sm font-semibold"
                                >
                                  {section.questions}
                                </td>
                                <td 
                                  style={{ color: colors.pureWhite }}
                                  className="text-center py-3 text-sm font-semibold"
                                >
                                  {section.marks}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>

                      <div 
                        style={{
                          backgroundColor: `${colors.hotOrange}10`,
                          borderColor: `${colors.hotOrange}30`,
                        }}
                        className="mt-4 p-4 rounded-lg border"
                      >
                        <div className="flex items-start space-x-2">
                          <AlertCircle 
                            style={{ color: colors.hotOrange }}
                            className="h-5 w-5 flex-shrink-0 mt-0.5"
                          />
                          <div>
                            <p 
                              style={{ color: colors.hotOrange }}
                              className="font-semibold text-sm mb-1"
                            >
                              Negative Marking
                            </p>
                            <p 
                              style={{ color: colors.moss }}
                              className="text-sm"
                            >
                              {tier.negativeMarking}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'syllabus' && (
              <div
                style={{
                  backgroundColor: colors.eerieBlack,
                  borderColor: `${colors.moss}20`,
                }}
                className="rounded-2xl border-2 p-6"
              >
                <h2 
                  style={{ color: colors.pureWhite }}
                  className="text-2xl font-bold mb-6"
                >
                  Detailed Syllabus
                </h2>

                <div className="space-y-6">
                  {examData.syllabus.map((subject, index) => (
                    <div
                      key={index}
                      style={{
                        backgroundColor: colors.smokyBlack,
                        borderColor: `${colors.moss}20`,
                      }}
                      className="rounded-xl border p-6"
                    >
                      <h3 
                        style={{ color: colors.pureWhite }}
                        className="text-xl font-bold mb-4"
                      >
                        {subject.subject}
                      </h3>

                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        {subject.topics.map((topic, idx) => (
                          <div
                            key={idx}
                            style={{
                              backgroundColor: colors.eerieBlack,
                              color: colors.moss,
                            }}
                            className="px-3 py-2 rounded-lg text-sm flex items-center space-x-2"
                          >
                            <CheckCircle className="h-3 w-3 flex-shrink-0" />
                            <span>{topic}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'dates' && (
              <div
                style={{
                  backgroundColor: colors.eerieBlack,
                  borderColor: `${colors.moss}20`,
                }}
                className="rounded-2xl border-2 p-6"
              >
                <h2 
                  style={{ color: colors.pureWhite }}
                  className="text-2xl font-bold mb-6"
                >
                  Important Dates
                </h2>

                <div className="space-y-4">
                  {examData.keyDates.map((date, index) => (
                    <div
                      key={index}
                      style={{
                        backgroundColor: colors.smokyBlack,
                        borderColor: `${colors.moss}20`,
                      }}
                      className="rounded-xl border p-4 flex items-center justify-between"
                    >
                      <div className="flex items-center space-x-4">
                        <div 
                          style={{
                            background: `linear-gradient(135deg, ${colors.hotOrange}20, ${colors.orangeWheel}20)`,
                          }}
                          className="w-12 h-12 rounded-lg flex items-center justify-center"
                        >
                          <Calendar style={{ color: colors.hotOrange }} className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 
                            style={{ color: colors.pureWhite }}
                            className="font-semibold mb-1"
                          >
                            {date.label}
                          </h3>
                          <p 
                            style={{ color: colors.moss }}
                            className="text-sm"
                          >
                            {new Date(date.date).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                      </div>

                      <span
                        style={{
                          backgroundColor: `${colors.orangeWheel}20`,
                          color: colors.orangeWheel,
                        }}
                        className="px-3 py-1 rounded-full text-xs font-semibold uppercase"
                      >
                        {date.status}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar - 1/3 */}
          <div className="space-y-6">
            
            {/* Quick Actions */}
            <div
              style={{
                backgroundColor: colors.eerieBlack,
                borderColor: `${colors.hotOrange}30`,
              }}
              className="rounded-2xl border-2 p-6"
            >
              <h3 
                style={{ color: colors.pureWhite }}
                className="text-lg font-bold mb-4"
              >
                Quick Actions
              </h3>

              <div className="space-y-3">
                <Link
                  to="/resources"
                  style={{
                    background: `linear-gradient(to right, ${colors.hotOrange}, ${colors.orangeWheel})`,
                    color: colors.pureWhite,
                  }}
                  className="w-full py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 transition-all duration-200"
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.02)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  <BookOpen className="h-5 w-5" />
                  <span>Study Materials</span>
                </Link>

                <Link
                  to="/pyq"
                  style={{
                    backgroundColor: colors.smokyBlack,
                    borderColor: `${colors.moss}30`,
                    color: colors.pureWhite,
                  }}
                  className="w-full py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 border-2 transition-all duration-200 hover:border-hotOrange"
                >
                  <FileText className="h-5 w-5" />
                  <span>Practice PYQs</span>
                </Link>

                <Link
                  to="/study-rooms"
                  style={{
                    backgroundColor: colors.smokyBlack,
                    borderColor: `${colors.moss}30`,
                    color: colors.pureWhite,
                  }}
                  className="w-full py-3 rounded-xl font-semibold flex items-center justify-center space-x-2 border-2 transition-all duration-200 hover:border-hotOrange"
                >
                  <Users className="h-5 w-5" />
                  <span>Join Study Room</span>
                </Link>
              </div>
            </div>

            {/* Important Links */}
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
                Important Links
              </h3>

              <div className="space-y-2">
                {examData.importantLinks.map((link, index) => {
                  const Icon = link.icon;
                  return (
                    <a
                      key={index}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        backgroundColor: colors.smokyBlack,
                        color: colors.moss,
                      }}
                      className="flex items-center justify-between p-3 rounded-lg transition-all duration-200 hover:bg-opacity-80"
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="h-4 w-4" />
                        <span className="text-sm font-medium">{link.name}</span>
                      </div>
                      <ChevronRight className="h-4 w-4" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Preparation Tips */}
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
                Preparation Tips
              </h3>

              <div className="space-y-3">
                <div 
                  style={{
                    backgroundColor: `${colors.hotOrange}10`,
                    borderColor: `${colors.hotOrange}30`,
                  }}
                  className="p-3 rounded-lg border"
                >
                  <p 
                    style={{ color: colors.pureWhite }}
                    className="text-sm font-semibold mb-1"
                  >
                    Start Early
                  </p>
                  <p 
                    style={{ color: colors.moss }}
                    className="text-xs"
                  >
                    Begin preparation at least 6 months before the exam
                  </p>
                </div>

                <div 
                  style={{
                    backgroundColor: `${colors.orangeWheel}10`,
                    borderColor: `${colors.orangeWheel}30`,
                  }}
                  className="p-3 rounded-lg border"
                >
                  <p 
                    style={{ color: colors.pureWhite }}
                    className="text-sm font-semibold mb-1"
                  >
                    Practice Daily
                  </p>
                  <p 
                    style={{ color: colors.moss }}
                    className="text-xs"
                  >
                    Solve at least 50 questions daily from each section
                  </p>
                </div>

                <div 
                  style={{
                    backgroundColor: `${colors.moss}10`,
                    borderColor: `${colors.moss}30`,
                  }}
                  className="p-3 rounded-lg border"
                >
                  <p 
                    style={{ color: colors.pureWhite }}
                    className="text-sm font-semibold mb-1"
                  >
                    Mock Tests
                  </p>
                  <p 
                    style={{ color: colors.moss }}
                    className="text-xs"
                  >
                    Take full-length mock tests every week
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamDetail;



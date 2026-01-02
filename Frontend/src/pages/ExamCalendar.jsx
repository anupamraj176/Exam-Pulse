import { useState, useEffect } from 'react';
import { 
  Calendar as CalendarIcon, 
  ChevronLeft, 
  ChevronRight, 
  Clock, 
  MapPin,
  ExternalLink,
  Bell,
  Filter,
  Loader
} from 'lucide-react';
import api from '../services/api';

const ExamCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [exams, setExams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedExam, setSelectedExam] = useState(null);

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

  const categories = [
    { id: 'all', name: 'All Exams' },
    { id: 'ssc', name: 'SSC' },
    { id: 'banking', name: 'Banking' },
    { id: 'railways', name: 'Railways' },
    { id: 'upsc', name: 'UPSC' },
    { id: 'state-psc', name: 'State PSC' },
    { id: 'defence', name: 'Defence' },
  ];

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  useEffect(() => {
    fetchExams();
  }, [currentDate, selectedCategory]);

  const fetchExams = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedCategory !== 'all') {
        params.append('category', selectedCategory);
      }
      
      const response = await api.get(`/exams?${params.toString()}`);
      if (response.data.success) {
        setExams(response.data.data.exams || []);
      }
    } catch (error) {
      console.error('Error fetching exams:', error);
    } finally {
      setLoading(false);
    }
  };

  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const getExamsForDate = (day) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return exams.filter(exam => {
      const examDate = new Date(exam.importantDates?.examDate);
      const appStart = new Date(exam.importantDates?.applicationStartDate);
      const appEnd = new Date(exam.importantDates?.applicationEndDate);
      
      return (
        examDate.toDateString() === date.toDateString() ||
        appStart.toDateString() === date.toDateString() ||
        appEnd.toDateString() === date.toDateString()
      );
    });
  };

  const getEventType = (exam, day) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const examDate = new Date(exam.importantDates?.examDate);
    const appStart = new Date(exam.importantDates?.applicationStartDate);
    const appEnd = new Date(exam.importantDates?.applicationEndDate);
    
    if (examDate.toDateString() === date.toDateString()) return { type: 'exam', color: '#EF4444', label: 'Exam' };
    if (appStart.toDateString() === date.toDateString()) return { type: 'start', color: '#22C55E', label: 'Apply Start' };
    if (appEnd.toDateString() === date.toDateString()) return { type: 'deadline', color: '#F59E0B', label: 'Deadline' };
    return null;
  };

  const isToday = (day) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const getUpcomingEvents = () => {
    const today = new Date();
    const events = [];
    
    exams.forEach(exam => {
      if (exam.importantDates?.examDate && new Date(exam.importantDates.examDate) >= today) {
        events.push({
          exam,
          date: new Date(exam.importantDates.examDate),
          type: 'exam',
          label: 'Exam Date'
        });
      }
      if (exam.importantDates?.applicationEndDate && new Date(exam.importantDates.applicationEndDate) >= today) {
        events.push({
          exam,
          date: new Date(exam.importantDates.applicationEndDate),
          type: 'deadline',
          label: 'Application Deadline'
        });
      }
    });
    
    return events.sort((a, b) => a.date - b.date).slice(0, 10);
  };

  const upcomingEvents = getUpcomingEvents();

  return (
    <div style={{ backgroundColor: colors.smokyBlack }} className="min-h-screen pt-20">
      {/* Header */}
      <div 
        style={{ 
          background: `linear-gradient(135deg, ${colors.night} 0%, ${colors.eerieBlack} 100%)`,
          borderBottom: `2px solid ${colors.hotOrange}`,
        }}
        className="py-12"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4 mb-4">
            <CalendarIcon className="w-10 h-10" style={{ color: colors.hotOrange }} />
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold" style={{ color: colors.pureWhite }}>
                Exam Calendar
              </h1>
              <p style={{ color: colors.moss }} className="mt-1">
                Track important exam dates and deadlines
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                selectedCategory === cat.id ? 'ring-2' : ''
              }`}
              style={{
                backgroundColor: selectedCategory === cat.id ? `${colors.hotOrange}20` : colors.eerieBlack,
                color: selectedCategory === cat.id ? colors.hotOrange : colors.pureWhite,
                ringColor: colors.hotOrange,
              }}
            >
              {cat.name}
            </button>
          ))}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <div 
              style={{ backgroundColor: colors.eerieBlack, borderColor: `${colors.moss}30` }}
              className="rounded-2xl border-2 p-6"
            >
              {/* Calendar Header */}
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={prevMonth}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <ChevronLeft className="w-6 h-6" style={{ color: colors.moss }} />
                </button>
                
                <h2 className="text-xl font-bold" style={{ color: colors.pureWhite }}>
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </h2>
                
                <button
                  onClick={nextMonth}
                  className="p-2 rounded-lg hover:bg-white/10 transition-colors"
                >
                  <ChevronRight className="w-6 h-6" style={{ color: colors.moss }} />
                </button>
              </div>

              {/* Day Names */}
              <div className="grid grid-cols-7 gap-1 mb-2">
                {dayNames.map(day => (
                  <div
                    key={day}
                    className="text-center text-sm font-medium py-2"
                    style={{ color: colors.moss }}
                  >
                    {day}
                  </div>
                ))}
              </div>

              {/* Calendar Grid */}
              {loading ? (
                <div className="flex justify-center py-16">
                  <Loader className="w-8 h-8 animate-spin" style={{ color: colors.hotOrange }} />
                </div>
              ) : (
                <div className="grid grid-cols-7 gap-1">
                  {Array.from({ length: firstDayOfMonth }).map((_, i) => (
                    <div key={`empty-${i}`} className="aspect-square" />
                  ))}
                  
                  {Array.from({ length: daysInMonth }).map((_, i) => {
                    const day = i + 1;
                    const dayExams = getExamsForDate(day);
                    const hasEvents = dayExams.length > 0;
                    
                    return (
                      <button
                        key={day}
                        onClick={() => hasEvents && setSelectedExam(dayExams[0])}
                        className={`
                          aspect-square rounded-lg flex flex-col items-center justify-center
                          text-sm transition-all relative p-1
                          ${isToday(day) ? 'ring-2' : ''}
                          ${hasEvents ? 'hover:scale-105 cursor-pointer' : 'hover:bg-white/5'}
                        `}
                        style={{
                          backgroundColor: hasEvents ? `${colors.hotOrange}20` : 'transparent',
                          color: isToday(day) ? colors.hotOrange : colors.pureWhite,
                          ringColor: colors.hotOrange,
                        }}
                      >
                        <span className="font-medium">{day}</span>
                        {hasEvents && (
                          <div className="flex gap-0.5 mt-1">
                            {dayExams.slice(0, 3).map((exam, idx) => {
                              const eventType = getEventType(exam, day);
                              return (
                                <div
                                  key={idx}
                                  className="w-1.5 h-1.5 rounded-full"
                                  style={{ backgroundColor: eventType?.color || colors.hotOrange }}
                                />
                              );
                            })}
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}

              {/* Legend */}
              <div className="flex flex-wrap gap-4 mt-6 pt-4 border-t" style={{ borderColor: `${colors.moss}20` }}>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#EF4444' }} />
                  <span className="text-xs" style={{ color: colors.pureWhite }}>Exam Date</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#22C55E' }} />
                  <span className="text-xs" style={{ color: colors.pureWhite }}>Application Start</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: '#F59E0B' }} />
                  <span className="text-xs" style={{ color: colors.pureWhite }}>Deadline</span>
                </div>
              </div>
            </div>
          </div>

          {/* Upcoming Events Sidebar */}
          <div>
            <div 
              style={{ backgroundColor: colors.eerieBlack, borderColor: `${colors.moss}30` }}
              className="rounded-2xl border-2 p-6"
            >
              <h3 className="text-lg font-bold mb-4 flex items-center gap-2" style={{ color: colors.pureWhite }}>
                <Bell className="w-5 h-5" style={{ color: colors.hotOrange }} />
                Upcoming Events
              </h3>

              {loading ? (
                <div className="flex justify-center py-8">
                  <Loader className="w-6 h-6 animate-spin" style={{ color: colors.hotOrange }} />
                </div>
              ) : upcomingEvents.length === 0 ? (
                <p className="text-center py-8" style={{ color: `${colors.pureWhite}60` }}>
                  No upcoming events
                </p>
              ) : (
                <div className="space-y-3">
                  {upcomingEvents.map((event, index) => (
                    <div
                      key={index}
                      className="p-3 rounded-xl transition-all hover:scale-[1.02] cursor-pointer"
                      style={{ backgroundColor: `${event.type === 'exam' ? '#EF4444' : '#F59E0B'}15` }}
                      onClick={() => setSelectedExam(event.exam)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate" style={{ color: colors.pureWhite }}>
                            {event.exam.name}
                          </h4>
                          <p className="text-xs mt-1" style={{ color: event.type === 'exam' ? '#EF4444' : '#F59E0B' }}>
                            {event.label}
                          </p>
                        </div>
                        <div className="text-right ml-2">
                          <p className="text-xs font-medium" style={{ color: colors.pureWhite }}>
                            {event.date.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                          </p>
                          <p className="text-xs" style={{ color: `${colors.pureWhite}60` }}>
                            {Math.ceil((event.date - new Date()) / (1000 * 60 * 60 * 24))} days
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Selected Exam Details */}
            {selectedExam && (
              <div 
                style={{ backgroundColor: colors.eerieBlack, borderColor: `${colors.moss}30` }}
                className="rounded-2xl border-2 p-6 mt-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <h3 className="text-lg font-bold" style={{ color: colors.pureWhite }}>
                    {selectedExam.name}
                  </h3>
                  <button
                    onClick={() => setSelectedExam(null)}
                    className="p-1 rounded hover:bg-white/10"
                    style={{ color: colors.moss }}
                  >
                    ✕
                  </button>
                </div>
                
                <div className="space-y-3">
                  {selectedExam.importantDates?.examDate && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" style={{ color: '#EF4444' }} />
                      <span className="text-sm" style={{ color: colors.pureWhite }}>
                        Exam: {new Date(selectedExam.importantDates.examDate).toLocaleDateString('en-IN', { 
                          day: 'numeric', month: 'long', year: 'numeric' 
                        })}
                      </span>
                    </div>
                  )}
                  
                  {selectedExam.importantDates?.applicationEndDate && (
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" style={{ color: '#F59E0B' }} />
                      <span className="text-sm" style={{ color: colors.pureWhite }}>
                        Deadline: {new Date(selectedExam.importantDates.applicationEndDate).toLocaleDateString('en-IN', { 
                          day: 'numeric', month: 'long', year: 'numeric' 
                        })}
                      </span>
                    </div>
                  )}
                  
                  {selectedExam.officialWebsite && (
                    <a
                      href={selectedExam.officialWebsite}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 mt-4 px-4 py-2 rounded-lg transition-colors"
                      style={{ backgroundColor: `${colors.hotOrange}20`, color: colors.hotOrange }}
                    >
                      <ExternalLink className="w-4 h-4" />
                      <span className="text-sm font-medium">Official Website</span>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamCalendar;

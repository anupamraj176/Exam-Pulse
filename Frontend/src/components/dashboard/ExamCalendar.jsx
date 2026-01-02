import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar } from 'lucide-react';
import Card from '../common/Card';

const ExamCalendar = ({ exams = [], onDateClick, onExamClick }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const colors = {
    moss: '#99A57D',
    vanilla: '#F6EDD4',
    asparagus: '#6B8F4A',
    eerieBlack: '#1C1B17',
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

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const prevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1));
  };

  const getExamsForDate = (day) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    return exams.filter(exam => {
      const examDate = new Date(exam.examDate || exam.date);
      return examDate.toDateString() === date.toDateString();
    });
  };

  const isToday = (day) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  return (
    <Card>
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={prevMonth}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors"
        >
          <ChevronLeft className="w-5 h-5" style={{ color: colors.moss }} />
        </button>
        
        <h3 className="text-lg font-semibold" style={{ color: colors.vanilla }}>
          {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
        </h3>
        
        <button
          onClick={nextMonth}
          className="p-2 rounded-lg hover:bg-white/10 transition-colors"
        >
          <ChevronRight className="w-5 h-5" style={{ color: colors.moss }} />
        </button>
      </div>

      <div className="grid grid-cols-7 gap-1 mb-2">
        {dayNames.map(day => (
          <div
            key={day}
            className="text-center text-xs font-medium py-2"
            style={{ color: `${colors.vanilla}60` }}
          >
            {day}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-1">
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} className="aspect-square" />
        ))}
        
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const day = i + 1;
          const dayExams = getExamsForDate(day);
          const hasExam = dayExams.length > 0;
          
          return (
            <button
              key={day}
              onClick={() => {
                if (hasExam && onExamClick) {
                  onExamClick(dayExams);
                } else if (onDateClick) {
                  onDateClick(new Date(currentDate.getFullYear(), currentDate.getMonth(), day));
                }
              }}
              className={`
                aspect-square rounded-lg flex flex-col items-center justify-center
                text-sm transition-all relative
                ${isToday(day) ? 'ring-2' : ''}
                ${hasExam ? 'hover:scale-105' : 'hover:bg-white/5'}
              `}
              style={{
                backgroundColor: hasExam ? `${colors.asparagus}30` : 'transparent',
                color: isToday(day) ? colors.asparagus : colors.vanilla,
                ringColor: colors.asparagus,
              }}
            >
              {day}
              {hasExam && (
                <div
                  className="absolute bottom-1 w-1.5 h-1.5 rounded-full"
                  style={{ backgroundColor: colors.asparagus }}
                />
              )}
            </button>
          );
        })}
      </div>

      {exams.length > 0 && (
        <div className="mt-4 pt-4 border-t" style={{ borderColor: `${colors.moss}20` }}>
          <h4 className="text-sm font-medium mb-2 flex items-center gap-2" style={{ color: colors.vanilla }}>
            <Calendar className="w-4 h-4" style={{ color: colors.moss }} />
            Upcoming Exams
          </h4>
          <div className="space-y-2">
            {exams.slice(0, 3).map((exam, index) => (
              <div
                key={exam._id || index}
                className="text-xs p-2 rounded"
                style={{ backgroundColor: `${colors.asparagus}20`, color: `${colors.vanilla}90` }}
              >
                <span className="font-medium">{exam.name}</span>
                <span className="mx-2">•</span>
                <span>{new Date(exam.examDate || exam.date).toLocaleDateString()}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </Card>
  );
};

export default ExamCalendar;

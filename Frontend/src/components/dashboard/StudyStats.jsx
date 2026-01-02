import { BookOpen, Clock, Target, Award, TrendingUp, Calendar } from 'lucide-react';
import Card from '../common/Card';

const StudyStats = ({ 
  stats = {
    totalStudyTime: 0,
    resourcesCompleted: 0,
    testsAttempted: 0,
    averageScore: 0,
    currentStreak: 0,
    longestStreak: 0,
  },
  className = ''
}) => {
  const colors = {
    moss: '#99A57D',
    vanilla: '#F6EDD4',
    asparagus: '#6B8F4A',
  };

  const formatTime = (minutes) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
  };

  const statItems = [
    {
      icon: Clock,
      label: 'Total Study Time',
      value: formatTime(stats.totalStudyTime || 0),
      bgColor: '#3B82F6',
    },
    {
      icon: BookOpen,
      label: 'Resources Completed',
      value: stats.resourcesCompleted || 0,
      bgColor: colors.asparagus,
    },
    {
      icon: Target,
      label: 'Tests Attempted',
      value: stats.testsAttempted || 0,
      bgColor: '#F59E0B',
    },
    {
      icon: Award,
      label: 'Average Score',
      value: `${stats.averageScore || 0}%`,
      bgColor: '#8B5CF6',
    },
    {
      icon: TrendingUp,
      label: 'Current Streak',
      value: `${stats.currentStreak || 0} days`,
      bgColor: '#EF4444',
    },
    {
      icon: Calendar,
      label: 'Longest Streak',
      value: `${stats.longestStreak || 0} days`,
      bgColor: '#10B981',
    },
  ];

  return (
    <Card className={className}>
      <h3 className="text-lg font-semibold mb-4" style={{ color: colors.vanilla }}>
        Study Statistics
      </h3>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {statItems.map((item, index) => (
          <div
            key={index}
            className="p-4 rounded-xl text-center transition-transform hover:scale-105"
            style={{ backgroundColor: `${item.bgColor}15` }}
          >
            <div
              className="w-10 h-10 rounded-full mx-auto mb-2 flex items-center justify-center"
              style={{ backgroundColor: `${item.bgColor}30` }}
            >
              <item.icon className="w-5 h-5" style={{ color: item.bgColor }} />
            </div>
            <div className="text-xl font-bold" style={{ color: colors.vanilla }}>
              {item.value}
            </div>
            <div className="text-xs" style={{ color: `${colors.vanilla}60` }}>
              {item.label}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default StudyStats;

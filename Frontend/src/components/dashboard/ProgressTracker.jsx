import { TrendingUp, Target, Award, Clock } from 'lucide-react';
import Card from '../common/Card';

const ProgressTracker = ({ 
  progress = {
    completed: 0,
    total: 100,
    streak: 0,
    hoursStudied: 0,
    testsCompleted: 0
  },
  className = ''
}) => {
  const colors = {
    moss: '#99A57D',
    vanilla: '#F6EDD4',
    asparagus: '#6B8F4A',
  };

  const percentage = progress.total > 0 
    ? Math.round((progress.completed / progress.total) * 100) 
    : 0;

  const stats = [
    {
      icon: Target,
      label: 'Progress',
      value: `${percentage}%`,
      color: colors.asparagus,
    },
    {
      icon: TrendingUp,
      label: 'Day Streak',
      value: progress.streak || 0,
      color: '#F59E0B',
    },
    {
      icon: Clock,
      label: 'Hours',
      value: progress.hoursStudied || 0,
      color: '#3B82F6',
    },
    {
      icon: Award,
      label: 'Tests',
      value: progress.testsCompleted || 0,
      color: '#8B5CF6',
    },
  ];

  return (
    <Card className={className}>
      <h3 className="text-lg font-semibold mb-4" style={{ color: colors.vanilla }}>
        Your Progress
      </h3>

      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-2">
          <span style={{ color: `${colors.vanilla}80` }}>Overall Progress</span>
          <span style={{ color: colors.asparagus }}>{percentage}%</span>
        </div>
        <div className="h-3 rounded-full overflow-hidden" style={{ backgroundColor: `${colors.moss}20` }}>
          <div
            className="h-full rounded-full transition-all duration-500"
            style={{
              width: `${percentage}%`,
              background: `linear-gradient(90deg, ${colors.moss}, ${colors.asparagus})`,
            }}
          />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="p-3 rounded-xl text-center"
            style={{ backgroundColor: `${stat.color}15` }}
          >
            <stat.icon
              className="w-5 h-5 mx-auto mb-1"
              style={{ color: stat.color }}
            />
            <div className="text-xl font-bold" style={{ color: colors.vanilla }}>
              {stat.value}
            </div>
            <div className="text-xs" style={{ color: `${colors.vanilla}60` }}>
              {stat.label}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ProgressTracker;

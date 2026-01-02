import { useState } from 'react';
import { Filter, X, ChevronDown, ChevronUp } from 'lucide-react';
import Card from '../common/Card';

const FilterPanel = ({ 
  filters = {},
  onFilterChange,
  categories = [],
  subjects = [],
  types = [],
  className = ''
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const colors = {
    moss: '#99A57D',
    vanilla: '#F6EDD4',
    asparagus: '#6B8F4A',
    eerieBlack: '#1C1B17',
  };

  const defaultCategories = categories.length > 0 ? categories : [
    'SSC', 'Banking', 'Railways', 'UPSC', 'State PSC', 'Defence'
  ];

  const defaultSubjects = subjects.length > 0 ? subjects : [
    'Mathematics', 'Reasoning', 'English', 'General Knowledge', 'Current Affairs'
  ];

  const defaultTypes = types.length > 0 ? types : [
    'Notes', 'PYQ', 'Mock Test', 'Video', 'Book'
  ];

  const handleFilterToggle = (filterType, value) => {
    const currentValues = filters[filterType] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    
    onFilterChange?.({
      ...filters,
      [filterType]: newValues
    });
  };

  const clearFilters = () => {
    onFilterChange?.({});
  };

  const activeFilterCount = Object.values(filters).reduce(
    (count, arr) => count + (Array.isArray(arr) ? arr.length : 0),
    0
  );

  const FilterChip = ({ label, isActive, onClick }) => (
    <button
      onClick={onClick}
      className={`px-3 py-1.5 rounded-full text-sm transition-all ${
        isActive ? 'ring-2' : 'hover:bg-white/10'
      }`}
      style={{
        backgroundColor: isActive ? `${colors.asparagus}30` : `${colors.moss}15`,
        color: isActive ? colors.asparagus : `${colors.vanilla}80`,
        ringColor: colors.asparagus,
      }}
    >
      {label}
    </button>
  );

  return (
    <Card padding="p-4" className={className}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 font-medium"
          style={{ color: colors.vanilla }}
        >
          <Filter className="w-5 h-5" style={{ color: colors.moss }} />
          Filters
          {activeFilterCount > 0 && (
            <span
              className="px-2 py-0.5 rounded-full text-xs"
              style={{ backgroundColor: colors.asparagus, color: 'white' }}
            >
              {activeFilterCount}
            </span>
          )}
          {isExpanded ? (
            <ChevronUp className="w-4 h-4" style={{ color: colors.moss }} />
          ) : (
            <ChevronDown className="w-4 h-4" style={{ color: colors.moss }} />
          )}
        </button>

        {activeFilterCount > 0 && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 text-sm hover:bg-white/10 px-2 py-1 rounded transition-colors"
            style={{ color: '#EF4444' }}
          >
            <X className="w-4 h-4" />
            Clear all
          </button>
        )}
      </div>

      {/* Filter Sections */}
      {isExpanded && (
        <div className="space-y-4">
          {/* Categories */}
          <div>
            <h4 className="text-sm font-medium mb-2" style={{ color: `${colors.vanilla}80` }}>
              Exam Category
            </h4>
            <div className="flex flex-wrap gap-2">
              {defaultCategories.map((category) => (
                <FilterChip
                  key={category}
                  label={category}
                  isActive={(filters.category || []).includes(category)}
                  onClick={() => handleFilterToggle('category', category)}
                />
              ))}
            </div>
          </div>

          {/* Subjects */}
          <div>
            <h4 className="text-sm font-medium mb-2" style={{ color: `${colors.vanilla}80` }}>
              Subject
            </h4>
            <div className="flex flex-wrap gap-2">
              {defaultSubjects.map((subject) => (
                <FilterChip
                  key={subject}
                  label={subject}
                  isActive={(filters.subject || []).includes(subject)}
                  onClick={() => handleFilterToggle('subject', subject)}
                />
              ))}
            </div>
          </div>

          {/* Types */}
          <div>
            <h4 className="text-sm font-medium mb-2" style={{ color: `${colors.vanilla}80` }}>
              Resource Type
            </h4>
            <div className="flex flex-wrap gap-2">
              {defaultTypes.map((type) => (
                <FilterChip
                  key={type}
                  label={type}
                  isActive={(filters.type || []).includes(type)}
                  onClick={() => handleFilterToggle('type', type)}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default FilterPanel;

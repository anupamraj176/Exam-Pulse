import { useState } from 'react';
import { X, Plus, Tag } from 'lucide-react';

const TagSystem = ({ 
  tags = [], 
  onChange,
  suggestions = [],
  maxTags = 10,
  placeholder = 'Add tag...',
  editable = true,
  className = ''
}) => {
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const colors = {
    moss: '#99A57D',
    vanilla: '#F6EDD4',
    asparagus: '#6B8F4A',
    eerieBlack: '#1C1B17',
  };

  const defaultSuggestions = suggestions.length > 0 ? suggestions : [
    'SSC CGL', 'SSC CHSL', 'IBPS PO', 'IBPS Clerk', 'SBI PO', 
    'RRB NTPC', 'RRB Group D', 'UPSC CSE', 'UPSC CAPF',
    'Mathematics', 'Reasoning', 'English', 'GK', 'Current Affairs',
    'Notes', 'PYQ', 'Mock Test', 'Important', 'Solved'
  ];

  const filteredSuggestions = defaultSuggestions.filter(
    s => s.toLowerCase().includes(inputValue.toLowerCase()) && !tags.includes(s)
  );

  const handleAddTag = (tag) => {
    const trimmedTag = tag.trim();
    if (trimmedTag && !tags.includes(trimmedTag) && tags.length < maxTags) {
      onChange?.([...tags, trimmedTag]);
      setInputValue('');
      setShowSuggestions(false);
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    onChange?.(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleAddTag(inputValue);
    } else if (e.key === 'Backspace' && !inputValue && tags.length > 0) {
      handleRemoveTag(tags[tags.length - 1]);
    }
  };

  const getTagColor = (tag) => {
    // Generate consistent color based on tag string
    const colors = [
      '#3B82F6', '#10B981', '#F59E0B', '#EF4444', 
      '#8B5CF6', '#EC4899', '#06B6D4', '#84CC16'
    ];
    const index = tag.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  };

  return (
    <div className={className}>
      {/* Tags Display */}
      <div className="flex flex-wrap gap-2 mb-2">
        {tags.map((tag, index) => {
          const tagColor = getTagColor(tag);
          return (
            <span
              key={index}
              className="inline-flex items-center gap-1 px-2 py-1 rounded-full text-sm"
              style={{ backgroundColor: `${tagColor}20`, color: tagColor }}
            >
              <Tag className="w-3 h-3" />
              {tag}
              {editable && (
                <button
                  onClick={() => handleRemoveTag(tag)}
                  className="ml-1 hover:bg-white/20 rounded-full p-0.5 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </span>
          );
        })}
      </div>

      {/* Input for adding tags */}
      {editable && tags.length < maxTags && (
        <div className="relative">
          <div className="flex items-center gap-2">
            <div 
              className="flex-1 flex items-center px-3 py-2 rounded-lg border"
              style={{ 
                backgroundColor: colors.eerieBlack, 
                borderColor: `${colors.moss}30` 
              }}
            >
              <Plus className="w-4 h-4 mr-2" style={{ color: `${colors.vanilla}50` }} />
              <input
                type="text"
                value={inputValue}
                onChange={(e) => {
                  setInputValue(e.target.value);
                  setShowSuggestions(true);
                }}
                onFocus={() => setShowSuggestions(true)}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                onKeyDown={handleKeyDown}
                placeholder={placeholder}
                className="flex-1 bg-transparent outline-none text-sm"
                style={{ color: colors.vanilla }}
              />
            </div>
          </div>

          {/* Suggestions Dropdown */}
          {showSuggestions && inputValue && filteredSuggestions.length > 0 && (
            <div 
              className="absolute z-10 w-full mt-1 py-1 rounded-lg shadow-xl max-h-48 overflow-y-auto"
              style={{ backgroundColor: colors.eerieBlack, border: `1px solid ${colors.moss}30` }}
            >
              {filteredSuggestions.slice(0, 8).map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleAddTag(suggestion)}
                  className="w-full text-left px-3 py-2 text-sm hover:bg-white/10 transition-colors"
                  style={{ color: colors.vanilla }}
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Max tags message */}
      {editable && tags.length >= maxTags && (
        <p className="text-xs mt-1" style={{ color: `${colors.vanilla}50` }}>
          Maximum {maxTags} tags allowed
        </p>
      )}
    </div>
  );
};

export default TagSystem;

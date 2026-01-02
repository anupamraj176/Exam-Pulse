import { Search, X } from 'lucide-react';
import { useState } from 'react';

const SearchBar = ({ 
  placeholder = 'Search...', 
  onSearch, 
  className = '',
  value: controlledValue,
  onChange: controlledOnChange
}) => {
  const [internalValue, setInternalValue] = useState('');
  
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;
  
  const handleChange = (e) => {
    const newValue = e.target.value;
    if (!isControlled) {
      setInternalValue(newValue);
    }
    if (controlledOnChange) {
      controlledOnChange(e);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(value);
    }
  };

  const handleClear = () => {
    if (!isControlled) {
      setInternalValue('');
    }
    if (controlledOnChange) {
      controlledOnChange({ target: { value: '' } });
    }
    if (onSearch) {
      onSearch('');
    }
  };

  const colors = {
    eerieBlack: '#1C1B17',
    licorice: '#100C0B',
    moss: '#99A57D',
    vanilla: '#F6EDD4',
    asparagus: '#6B8F4A',
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className="relative">
        <Search 
          className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
          style={{ color: `${colors.moss}80` }}
        />
        <input
          type="text"
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          style={{
            backgroundColor: colors.eerieBlack,
            borderColor: `${colors.moss}30`,
            color: colors.vanilla,
          }}
          className="w-full pl-10 pr-10 py-3 rounded-xl border-2 
                     focus:outline-none focus:border-opacity-60 
                     placeholder:text-gray-500 transition-all"
        />
        {value && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full 
                       hover:bg-gray-700 transition-colors"
          >
            <X className="w-4 h-4" style={{ color: colors.moss }} />
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;

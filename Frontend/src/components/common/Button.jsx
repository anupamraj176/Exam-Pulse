const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  onClick, 
  disabled = false,
  className = '',
  type = 'button',
  ...props 
}) => {
  const colors = {
    smokyBlack: '#100C0B',
    eerieBlack: '#1C1B17',
    moss: '#99A57D',
    hotOrange: '#E9460A',
    orangeWheel: '#F77E0D',
    pureWhite: '#FFFFFF',
  };

  const variants = {
    primary: {
      background: `linear-gradient(to right, ${colors.hotOrange}, ${colors.orangeWheel})`,
      color: colors.pureWhite,
      border: 'none',
    },
    secondary: {
      background: colors.eerieBlack,
      color: colors.pureWhite,
      border: `2px solid ${colors.moss}30`,
    },
    outline: {
      background: 'transparent',
      color: colors.hotOrange,
      border: `2px solid ${colors.hotOrange}`,
    },
    ghost: {
      background: 'transparent',
      color: colors.moss,
      border: 'none',
    },
  };

  const sizes = {
    small: 'px-3 py-1.5 text-sm',
    medium: 'px-5 py-2.5 text-base',
    large: 'px-8 py-4 text-lg',
  };

  const style = variants[variant];

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={style}
      className={`
        ${sizes[size]}
        rounded-xl font-semibold
        transition-all duration-200
        disabled:opacity-50 disabled:cursor-not-allowed
        hover:opacity-90
        ${className}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

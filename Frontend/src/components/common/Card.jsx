const Card = ({ 
  children, 
  className = '', 
  padding = 'p-6',
  hover = true,
  onClick,
  ...props 
}) => {
  const colors = {
    eerieBlack: '#1C1B17',
    moss: '#99A57D',
  };

  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: colors.eerieBlack,
        borderColor: `${colors.moss}30`,
      }}
      className={`
        rounded-2xl border-2
        ${padding}
        ${hover ? 'hover:border-opacity-60 transition-all' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      {...props}
    >
      {children}
    </div>
  );
};

export default Card;

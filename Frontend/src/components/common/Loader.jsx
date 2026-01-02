import { Loader as LoaderIcon } from 'lucide-react';

const Loader = ({ size = 'default', fullScreen = true }) => {
  const colors = {
    smokyBlack: '#100C0B',
    hotOrange: '#E9460A',
    pureWhite: '#FFFFFF',
  };

  const sizeClasses = {
    small: 'h-6 w-6',
    default: 'h-10 w-10',
    large: 'h-16 w-16',
  };

  if (fullScreen) {
    return (
      <div
        style={{ backgroundColor: colors.smokyBlack }}
        className="fixed inset-0 flex items-center justify-center z-50"
      >
        <div className="text-center">
          <LoaderIcon
            style={{ color: colors.hotOrange }}
            className={`${sizeClasses[size]} animate-spin mx-auto mb-4`}
          />
          <p style={{ color: colors.pureWhite }} className="text-sm">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center py-8">
      <LoaderIcon
        style={{ color: colors.hotOrange }}
        className={`${sizeClasses[size]} animate-spin`}
      />
    </div>
  );
};

export default Loader;

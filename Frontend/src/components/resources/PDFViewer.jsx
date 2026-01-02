import { useState } from 'react';
import { 
  ZoomIn, ZoomOut, RotateCw, Download, 
  ChevronLeft, ChevronRight, Maximize2, X 
} from 'lucide-react';

const PDFViewer = ({ 
  url, 
  title = 'Document',
  onClose,
  className = '' 
}) => {
  const [zoom, setZoom] = useState(100);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  const colors = {
    moss: '#99A57D',
    vanilla: '#F6EDD4',
    asparagus: '#6B8F4A',
    eerieBlack: '#1C1B17',
    licorice: '#100C0B',
  };

  const handleZoomIn = () => {
    setZoom(prev => Math.min(prev + 25, 200));
  };

  const handleZoomOut = () => {
    setZoom(prev => Math.max(prev - 25, 50));
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const handleDownload = () => {
    if (url) {
      window.open(url, '_blank');
    }
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const containerClass = isFullscreen 
    ? 'fixed inset-0 z-50' 
    : `relative rounded-xl overflow-hidden ${className}`;

  return (
    <div 
      className={containerClass}
      style={{ backgroundColor: colors.licorice }}
    >
      {/* Toolbar */}
      <div 
        className="flex items-center justify-between px-4 py-2 border-b"
        style={{ backgroundColor: colors.eerieBlack, borderColor: `${colors.moss}30` }}
      >
        <div className="flex items-center gap-4">
          <h3 className="font-medium truncate max-w-xs" style={{ color: colors.vanilla }}>
            {title}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          {/* Page Navigation */}
          <div className="flex items-center gap-1 mr-4">
            <button
              onClick={handlePrevPage}
              disabled={currentPage <= 1}
              className="p-1.5 rounded hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronLeft className="w-4 h-4" style={{ color: colors.vanilla }} />
            </button>
            <span className="text-sm px-2" style={{ color: colors.vanilla }}>
              {currentPage} / {totalPages}
            </span>
            <button
              onClick={handleNextPage}
              disabled={currentPage >= totalPages}
              className="p-1.5 rounded hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              <ChevronRight className="w-4 h-4" style={{ color: colors.vanilla }} />
            </button>
          </div>

          {/* Zoom Controls */}
          <div className="flex items-center gap-1 border-r pr-4 mr-2" style={{ borderColor: `${colors.moss}30` }}>
            <button
              onClick={handleZoomOut}
              disabled={zoom <= 50}
              className="p-1.5 rounded hover:bg-white/10 disabled:opacity-50 transition-colors"
            >
              <ZoomOut className="w-4 h-4" style={{ color: colors.vanilla }} />
            </button>
            <span className="text-sm w-12 text-center" style={{ color: colors.vanilla }}>
              {zoom}%
            </span>
            <button
              onClick={handleZoomIn}
              disabled={zoom >= 200}
              className="p-1.5 rounded hover:bg-white/10 disabled:opacity-50 transition-colors"
            >
              <ZoomIn className="w-4 h-4" style={{ color: colors.vanilla }} />
            </button>
          </div>

          {/* Actions */}
          <button
            onClick={handleDownload}
            className="p-1.5 rounded hover:bg-white/10 transition-colors"
            title="Download"
          >
            <Download className="w-4 h-4" style={{ color: colors.vanilla }} />
          </button>
          
          <button
            onClick={toggleFullscreen}
            className="p-1.5 rounded hover:bg-white/10 transition-colors"
            title={isFullscreen ? 'Exit fullscreen' : 'Fullscreen'}
          >
            <Maximize2 className="w-4 h-4" style={{ color: colors.vanilla }} />
          </button>

          {onClose && (
            <button
              onClick={onClose}
              className="p-1.5 rounded hover:bg-white/10 transition-colors ml-2"
              title="Close"
            >
              <X className="w-4 h-4" style={{ color: colors.vanilla }} />
            </button>
          )}
        </div>
      </div>

      {/* PDF Content */}
      <div 
        className="flex-1 overflow-auto"
        style={{ 
          height: isFullscreen ? 'calc(100vh - 52px)' : '600px',
          backgroundColor: '#525659' 
        }}
      >
        {url ? (
          <iframe
            src={`${url}#zoom=${zoom}&page=${currentPage}`}
            className="w-full h-full border-0"
            title={title}
            style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'top center' }}
          />
        ) : (
          <div className="flex items-center justify-center h-full">
            <p style={{ color: `${colors.vanilla}60` }}>No document loaded</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default PDFViewer;

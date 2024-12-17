import React, { ReactNode, useEffect } from 'react';

interface ModalProps {
  children: ReactNode;
  className?: string;
  onClose?: () => void;
}

export const Modal: React.FC<ModalProps> = ({ children, className = '', onClose }) => {
  // Disable scrolling on body when modal is open
  useEffect(() => {
    // Prevent scrolling
    document.body.style.overflow = 'hidden';
    
    // Re-enable scrolling when component unmounts
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto"
      onClick={(e) => {
        // Close modal if clicking outside
        if (e.target === e.currentTarget && onClose) {
          onClose();
        }
      }}
    >
      <div 
        className={`relative bg-white rounded-lg shadow-xl max-w-xl w-full max-h-[90vh] overflow-hidden ${className}`}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
      >
        {children}
      </div>
    </div>
  );
};

interface ModalHeaderProps {
  children: ReactNode;
  className?: string;
}

export const ModalHeader: React.FC<ModalHeaderProps> = ({ children, className = '' }) => {
  return (
    <div className={`px-6 py-4 border-b text-xl font-semibold text-gray-800 ${className}`}>
      {children}
    </div>
  );
};

interface ModalBodyProps {
  children: ReactNode;
  className?: string;
}

export const ModalBody: React.FC<ModalBodyProps> = ({ children, className = '' }) => {
  return (
    <div className={`p-6 overflow-y-auto max-h-[70vh] ${className}`}>
      {children}
    </div>
  );
};

interface ModalFooterProps {
  children: ReactNode;
  className?: string;
}

export const ModalFooter: React.FC<ModalFooterProps> = ({ children, className = '' }) => {
  return (
    <div className={`px-6 py-4 border-t flex justify-end space-x-2 ${className}`}>
      {children}
    </div>
  );
};

export default Modal;
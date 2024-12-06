import React, { useState, useRef, useEffect } from 'react';
import { FaSearch, FaTimes, FaChevronDown, FaList } from 'react-icons/fa';
import { Modal, ModalHeader, ModalBody, ModalFooter } from '../components/Modal';

interface AutocompleteProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  className?: string;
  type?: 'input' | 'select';
  maxVisibleOptions?: number;
  disableSeeAll?: boolean;
  expertCounts?: Record<string, number>;
}

const Autocomplete: React.FC<AutocompleteProps> = ({
  options,
  value,
  onChange,
  placeholder,
  className = '',
  type = 'input',
  maxVisibleOptions = 10,
  expertCounts = {},
  disableSeeAll = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [filteredOptions, setFilteredOptions] = useState<string[]>(options.slice(0, maxVisibleOptions));
  const [showAllModal, setShowAllModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const [isFocused, setIsFocused] = useState(false);
  
  
  // Reset filtered options when options prop changes
  useEffect(() => {
    setFilteredOptions(options.slice(0, maxVisibleOptions));
  }, [options, maxVisibleOptions]);

  const handleInputChange = (inputValue: string) => {
    const cleanedInput = inputValue;
    setSearchTerm(cleanedInput);
  
    if (type === 'input') {
      onChange(cleanedInput);
    }
    
    const filtered = options
      .filter(option => {
        if (!cleanedInput) return true;
        
        const lowerOption = option.toLowerCase();
        const lowerInput = cleanedInput.toLowerCase();
        
        return lowerOption.includes(lowerInput);
      });
    
    const filteredSlice = filtered.slice(0, maxVisibleOptions);
    
    // Only open dropdown if there are filtered options
    if (filteredSlice.length > 0) {
      setFilteredOptions(filteredSlice);
      setIsOpen(true);
    } else {
      // If no options match, close the dropdown
      setIsOpen(false);
    }
  };

  // Explicit method to manage dropdown visibility
  const manageFocus = () => {
    const filtered = options
      .filter(option => 
        option.toLowerCase().includes(value.toLowerCase())
      );
    
    // Only open if there are filtered options
    if (filtered.length > 0) {
      setFilteredOptions(filtered.slice(0, maxVisibleOptions));
      setIsOpen(true);
    }
  };

  // Handle option selection
  const handleOptionSelect = (selectedOption: string) => {
    // Update value and reset search states
    onChange(selectedOption);
    setSearchTerm('');
    setIsOpen(false);
    setShowAllModal(false);
  };

  // Toggle dropdown for select-like input
  const handleDropdownToggle = () => {
    if (type === 'select') {
      // For select type, toggle open/closed
      setIsOpen(prev => !prev);
      
      // Always reset to full options when opening
      if (!isOpen) {
        setFilteredOptions(options.slice(0, maxVisibleOptions));
        setSearchTerm('');
      }
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current && 
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Clear input
  const handleClear = () => {
    onChange('');
    setSearchTerm('');
    setFilteredOptions(options.slice(0, maxVisibleOptions));
    setIsOpen(false);
  };

  // Toggle the "See All" modal
  const toggleSeeAllModal = () => {
    setShowAllModal(prev => !prev);
    if (!showAllModal) {
      // Reset filteredOptions to show all when opening the modal
      setFilteredOptions(options);
    }
    setSearchTerm('');
  };
  

  // Determine the displayed value
  const displayValue = type === 'select' ? (value || placeholder) : value;

  return (
    <div 
      ref={containerRef} 
      className={`relative w-full max-w-xs ${className}`}
    >
      <div className="relative">
        {type === 'input' ? (
          <input
            type="text"
            value={displayValue}
            onChange={(e) => handleInputChange(e.target.value)}
            placeholder={placeholder}
            className="w-full px-4 py-2 border rounded-lg bg-white text-gray-700 shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400 pr-10"
            onFocus={() => {
              setIsFocused(true);
              // Ensure dropdown opens with existing input or shows full options
              const filtered = options
                .filter(option => 
                  !value || option.toLowerCase().includes(value.toLowerCase())
                );
              
              if (filtered.length > 0) {
                setFilteredOptions(filtered.slice(0, maxVisibleOptions));
                setIsOpen(true);
              }
            }}
            onBlur={() => {
              // Slight delay to handle option selection
              setTimeout(() => {
                setIsFocused(false);
                setIsOpen(false);
              }, 200);
            }}
          />
        ) : (
          // Select-like input with search functionality
          <div 
            onClick={handleDropdownToggle}
            className="w-full px-4 py-2 border rounded-lg bg-white text-gray-700 shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400 flex justify-between items-center cursor-pointer"
          >
            <span>{displayValue}</span>
            <FaChevronDown className="text-gray-500" />
          </div>
        )}

        {type === 'input' && value && (
          <button
            onClick={handleClear}
            className="absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            <FaTimes />
          </button>
        )}

        {type === 'input' && (
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500">
            <FaSearch />
          </div>
        )}
      </div>

      {(isOpen || isFocused) && filteredOptions.length > 0 && (
        <div className="absolute z-10 w-full bg-white border rounded-lg shadow-lg mt-1 max-h-60 overflow-y-auto">
          {type === 'select' && (
            <input
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => handleInputChange(e.target.value)}
              className="w-full px-4 py-2 border-b bg-white text-gray-700 focus:outline-none"
            />
          )}
          <ul>
            {filteredOptions.length > 0 ? (
              filteredOptions.map((option) => (
                <li
                  key={option}
                  onClick={() => handleOptionSelect(option)}
                  className="px-4 py-2 hover:bg-pink-100 cursor-pointer text-gray-700 
                             hover:text-pink-700 transition-colors flex justify-between items-center"
                >
                  <span>{option}</span>
                  {expertCounts[option] && (
                    <span className="text-sm text-gray-500">
                      ({expertCounts[option]})
                    </span>
                  )}
                </li>
              ))
            ) : (
              <li className="px-4 py-2 text-gray-500 text-center">
                No options found
              </li>
            )}
            {!disableSeeAll && options.length > maxVisibleOptions && (
              <li
                onClick={toggleSeeAllModal}
                className="px-4 py-2 hover:bg-pink-100 cursor-pointer text-pink-700 flex items-center justify-center"
              >
                <FaList className="mr-2" />
                See All
              </li>
            )}
          </ul>
        </div>
      )}

      {showAllModal && (
        <Modal onClose={toggleSeeAllModal}>
          <ModalHeader>
            All Options ({options.length})
          </ModalHeader>
          <ModalBody className="max-h-[70vh] overflow-y-auto">
            <input
              type="text"
              placeholder="Search options..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 mb-4 border rounded-lg bg-white text-gray-700 shadow-md focus:outline-none focus:ring-2 focus:ring-pink-400 sticky top-0 z-10"
            />
            <ul>
              {options
                .filter(option => option.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((option) => (
                  <li
                    key={option}
                    onClick={() => {
                      handleOptionSelect(option);
                    }}
                    className="px-4 py-2 hover:bg-pink-100 cursor-pointer text-gray-700 
                              hover:text-pink-700 transition-colors flex justify-between items-center"
                  >
                    <span>{option}</span>
                    {expertCounts[option] && (
                      <span className="text-sm text-gray-500">
                        ({expertCounts[option]})
                      </span>
                    )}
                  </li>
                ))}
            </ul>
          </ModalBody>
          <ModalFooter>
            <button
              onClick={toggleSeeAllModal}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg shadow-md hover:bg-gray-600 transition-all"
            >
              Close
            </button>
          </ModalFooter>
        </Modal>
      )}

    </div>
  );
};

export default Autocomplete;
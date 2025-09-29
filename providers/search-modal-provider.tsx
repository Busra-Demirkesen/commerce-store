'use client';

import { useState, createContext, useContext, ReactNode } from 'react';
import SearchBar from '@/components/search-bar';

interface SearchContextType {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);

  return (
    <SearchContext.Provider value={{ isOpen, onOpen, onClose }}>
      {children}
      <SearchBar isOpen={isOpen} onClose={onClose} />
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

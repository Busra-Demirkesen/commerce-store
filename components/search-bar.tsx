'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import qs from 'query-string';
import { X } from 'lucide-react'; 

import Button from '@/components/ui/button';
import Input from '@/components/ui/input'; 
import { cn } from '@/lib/utils'; 

interface SearchBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    onClose();

    const term = searchTerm.trim();
    const url = qs.stringifyUrl({ url: '/', query: { searchTerm: term || undefined } }, { skipNull: true });
    // Server page will redirect to product detail if there is a match
    router.push(url);
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className={cn(
      "fixed w-full z-50 p-4 flex items-center justify-between", 
      isOpen ? "top-16 opacity-100 visible" : "-top-full opacity-0 invisible", 
      "bg-white shadow-lg rounded-lg transition-all duration-300"
    )}>
      <form onSubmit={onSubmit} className="flex-grow flex items-center space-x-2">
        <Input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow border-gray-300 rounded-md"
        />
        <Button type="submit" className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800">
          Search
        </Button>
      </form>
      <Button onClick={onClose} className="ml-4 p-2 bg-transparent border-none">
        <X size={20} color="black" />
      </Button>
    </div>
  );
}

export default SearchBar;


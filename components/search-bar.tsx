'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import qs from 'query-string';
import { X } from 'lucide-react'; // Import X icon for close button

import Button from '@/components/ui/button';
import Input from '@/components/ui/input'; // Assuming you have an Input component or will create one
import { cn } from '@/lib/utils'; // `cn` fonksiyonunu içeri aktarıyoruz

interface SearchBarProps {
  isOpen: boolean;
  onClose: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ isOpen, onClose }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onClose(); // Close search bar after submission

    const url = qs.stringifyUrl({
      url: '/',
      query: {
        searchTerm: searchTerm,
      },
    }, { skipNull: true });

    router.push(url);
  };

  return (
    <div className={cn(
      "absolute top-1/2 -translate-y-1/2 right-full z-50 p-2 flex items-center space-x-2 border rounded-full bg-gray-100 transition-all duration-300",
      isOpen ? "opacity-100 visible -translate-x-full" : "opacity-0 invisible",
      "w-[10rem] lg:w-[15rem]"
    )}>
      <form onSubmit={onSubmit} className="flex-grow flex items-center space-x-2">
        <Input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow bg-transparent border-none focus:ring-0 text-black placeholder-gray-500 py-1"
        />
        <Button type="submit" className="bg-transparent text-gray-600 px-2 py-1 rounded-full hover:bg-gray-200">
          Search
        </Button>
      </form>
      <button onClick={onClose} className="p-1 rounded-full hover:bg-gray-200">
        <X size={16} color="black" />
      </button>
    </div>
  );
}

export default SearchBar;


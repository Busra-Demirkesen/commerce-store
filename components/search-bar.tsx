'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import qs from 'query-string';
// import { X } from 'lucide-react'; // Removed X icon

import Button from '@/components/ui/button';
import Input from '@/components/ui/input';
// import { cn } from '@/lib/utils'; // Removed cn utility

// Removed SearchBarProps interface

const SearchBar: React.FC = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // onClose(); // Removed onClose call

    const url = qs.stringifyUrl({
      url: '/',
      query: {
        searchTerm: searchTerm,
      },
    }, { skipNull: true });

    router.push(url);
  };

  // if (!isOpen) { // Removed conditional render
  //   return null;
  // }

  return (
    <div className="flex items-center space-x-2 rounded-full px-4 py-2 bg-black">
      <form onSubmit={onSubmit} className="flex-grow flex items-center space-x-2">
        <Input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow bg-transparent border-none focus:ring-0 text-white placeholder-gray-400"
        />
        <Button type="submit" className="bg-transparent text-white px-2 py-1 rounded-full hover:bg-gray-800">
          Search
        </Button>
      </form>
      {/* <Button onClick={onClose} className="ml-4 p-2 bg-transparent border-none"> // Removed close button
        <X size={20} color="black" />
      </Button> */}
    </div>
  );
}

export default SearchBar;


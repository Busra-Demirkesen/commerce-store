'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import qs from 'query-string';
import { X } from 'lucide-react'; // Import X icon for close button

import Button from '@/components/ui/button';
import Input from '@/components/ui/input'; // Assuming you have an Input component or will create one

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

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed w-full z-50 p-4 flex items-center justify-between" style={{ top: '4rem' }}>
      <form onSubmit={onSubmit} className="flex-grow flex items-center space-x-2">
        <Input
          type="text"
          placeholder="Ürün ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow border-gray-300 rounded-md"
        />
        <Button type="submit" className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800">
          Ara
        </Button>
      </form>
      <Button onClick={onClose} className="ml-4 p-2 bg-transparent border-none">
        <X size={20} color="black" />
      </Button>
    </div>
  );
}

export default SearchBar;


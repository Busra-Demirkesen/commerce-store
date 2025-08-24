'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import qs from 'query-string';

import Button from '@/components/ui/button';
import Input from '@/components/ui/input'; // Assuming you have an Input component or will create one

const SearchBar = () => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const url = qs.stringifyUrl({
      url: '/',
      query: {
        searchTerm: searchTerm,
      },
    }, { skipNull: true });

    router.push(url);
  };

  return (
    <div className="flex items-center space-x-2 p-2 bg-gray-100 rounded-md">
      <form onSubmit={onSubmit} className="flex-grow flex items-center space-x-2">
        <Input
          type="text"
          placeholder="Ürün ara..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-grow"
        />
        <Button type="submit">
          Ara
        </Button>
      </form>
    </div>
  );
}

export default SearchBar;


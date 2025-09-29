'use client';

import { Search } from "lucide-react";
import { useSearch } from "@/providers/search-modal-provider";
import Button from '@/components/ui/button';

const SearchIconClient = () => {
  const { onOpen } = useSearch();

  return (
    <Button onClick={onOpen} className="flex items-center rounded-full p-2 bg-gray-100 hover:bg-gray-200">
      <Search size={20} color="black" />
    </Button>
  );
}

export default SearchIconClient;

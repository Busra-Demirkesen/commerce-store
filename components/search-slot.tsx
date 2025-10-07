"use client";

import InlineSearch from "./inline-search";
import { useSearch } from "@/providers/search-modal-provider";

const SearchSlot = () => {
  const { isOpen, onClose } = useSearch();

  if (!isOpen) return null;

  return (
    <div className="flex-1 px-4 hidden lg:block">
      <InlineSearch onClose={onClose} />
    </div>
  );
};

export default SearchSlot;


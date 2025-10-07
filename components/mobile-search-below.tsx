"use client";

import InlineSearch from "./inline-search";
import { useSearch } from "@/providers/search-modal-provider";

const MobileSearchBelow = () => {
  const { isOpen, onClose } = useSearch();

  if (!isOpen) return null;

  return (
    <div className="block lg:hidden px-4 sm:px-6 lg:px-8 py-2">
      <InlineSearch onClose={onClose} />
    </div>
  );
};

export default MobileSearchBelow;


"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import qs from "query-string";
import { X } from "lucide-react";
import Input from "@/components/ui/input";
import Button from "@/components/ui/button";

interface InlineSearchProps {
  onClose: () => void;
}

const InlineSearch: React.FC<InlineSearchProps> = ({ onClose }) => {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onClose();
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: { searchTerm },
      },
      { skipNull: true }
    );
    router.push(url);
  };

  return (
    <form onSubmit={onSubmit} className="flex w-full items-center gap-2">
      <Input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full h-9 sm:h-10 rounded-md border-gray-300"
      />
      <Button type="submit" className="h-9 sm:h-10 px-3 bg-black text-white hover:bg-gray-800">
        Search
      </Button>
      <button
        type="button"
        onClick={onClose}
        aria-label="Close search"
        className="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-100"
      >
        <X size={18} />
      </button>
    </form>
  );
};

export default InlineSearch;


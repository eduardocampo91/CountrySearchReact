import { useState } from "react";

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

function SearchBar({ value, onChange, placeholder }: Props) {
  return (
    <>
      <input
        type="text"
        value={value}
        placeholder={placeholder || "Search..."}
        onChange={(e) => onChange(e.target.value)}
        className="mb-4 px-3 py-2 border border-gray-300 rounded w-full"
      />
    </>
  );
}

export default SearchBar;

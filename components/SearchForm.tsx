import React from "react";

const SearchForm: React.FC<{ className?: string }> = ({ className }) => {
  const search = (event) => {
    event.preventDefault();
  };

  return (
    <form
      className={`h-full justify-between items-center ${className}`}
      onSubmit={search}
    >
      <input
        type="text"
        className="h-8 flex-1 rounded px-1"
        placeholder="Search for block or tx hash"
      />
      <button type="submit" className="bg-indigo-500 py-1 px-1 ml-2 rounded">
        Search
      </button>
    </form>
  );
};

export default SearchForm;

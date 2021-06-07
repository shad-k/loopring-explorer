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
        className="h-12 flex-1 rounded-sm px-1"
        placeholder="Search for block or tx hash"
      />
      <button
        type="submit"
        className="bg-indigo-700 py-1 px-8 ml-2 rounded text-white h-12"
      >
        Search
      </button>
    </form>
  );
};

export default SearchForm;

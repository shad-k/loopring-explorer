import React from "react";
import { useRouter } from "next/router";

const SearchForm: React.FC<{ className?: string }> = ({ className }) => {
  const router = useRouter();

  const search: React.EventHandler<React.SyntheticEvent> = (
    event: React.SyntheticEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const { query } = event.currentTarget;

    router.push({
      pathname: "/search",
      query: {
        q: query.value,
      },
    });

    event.currentTarget.reset();
  };

  return (
    <form
      className={`h-full justify-between items-center ${className}`}
      onSubmit={search}
    >
      <input
        type="text"
        name="query"
        className="h-12 flex-1 rounded-sm px-1"
        placeholder="Search for block, tx or account ID"
        onFocus={() => router.prefetch("/search")}
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

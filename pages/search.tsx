import React from "react";
import { useRouter } from "next/router";
import useSearch from "../hooks/useSearch";

const Search: React.FC<{}> = () => {
  const router = useRouter();
  const searchQuery = router.query.q;
  const { loaded, redirectLink } = useSearch(searchQuery as string);

  React.useEffect(() => {
    if (loaded && redirectLink) {
      router.replace(redirectLink);
    }
  }, [loaded, redirectLink]);

  if (!loaded) {
    return (
      <div className="bg-white shadow-custom rounded p-4 h-40 mt-24 text-gray-400 text-2xl flex items-center justify-center animate-pulse">
        Searching...
      </div>
    );
  }

  if (loaded && !redirectLink) {
    return (
      <div className="bg-white shadow-custom rounded px-4 py-10 h-40 mt-24 flex items-center justify-between flex-col text-center">
        <h2 className="text-3xl text-indigo-900">No results found</h2>
        <div className="text-lg text-indigo-700">
          We couldn't find any block, transaction or account with ID:&nbsp;
          <span className="font-bold">{searchQuery}</span>
        </div>
      </div>
    );
  }

  return null;
};

export default Search;

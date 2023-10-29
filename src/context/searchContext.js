import React, { createContext, useContext, useState } from 'react';

const SEARCH_KEYWORDS = createContext();

const SearchContext = ({children}) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const value = {searchKeyword, setSearchKeyword};
  return (
    <SEARCH_KEYWORDS.Provider value={value}>
      {children}
    </SEARCH_KEYWORDS.Provider>
  );
}

export const useKeywords = () => {
  const searchItems = useContext(SEARCH_KEYWORDS);
  return searchItems;
}

export default SearchContext;
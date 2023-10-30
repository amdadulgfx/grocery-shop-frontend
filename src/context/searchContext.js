import React, { createContext, useContext, useState } from 'react';
import { useSearchProductsListMutation } from '../reduxMine/features/searchProducts/searchProductsAPI';
import { useEffect } from 'react';

const SEARCH_KEYWORDS = createContext();

const SearchContext = ({children}) => {
  const [searchKeyword, setSearchKeyword] = useState('');
  const [products, setProducts] = useState([]);
  const [searchProductsList, { data, isLoading }] = useSearchProductsListMutation();

  const handleSearchProductLists = (searchQueries) => searchProductsList(searchQueries);

  
  useEffect(() => {
    setProducts(data?.data);
  }, [data?.data]);

  const value = {searchKeyword, setSearchKeyword, products, setProducts, handleSearchProductLists, isLoading };
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
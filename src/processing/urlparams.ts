import React, {useState, useEffect} from 'react';

export const getQuery = () => {
    if (typeof window !== "undefined") {
      return new URLSearchParams(window.location.search);
    }
    return new URLSearchParams();
  };
  
export const getQueryStringVal = (key: string): string | null => {
    return getQuery().get(key);
  };
  
export const useQueryParam = (
    key: string,
    defaultVal: string
  ): [string, (val: string) => void] => {
    const [query, setQuery] = useState(getQueryStringVal(key) || defaultVal);
  
    const updateUrl = (newVal: string) => {
      setQuery(newVal);
  
      const query = getQuery();
  
      if (newVal.trim() !== "") {
        query.set(key, newVal);
      } else {
        query.delete(key);
      }

      // This check is necessary if using the hook with Gatsby
      if (typeof window !== "undefined") {
        const { protocol, pathname, host } = window.location;
        const newUrl = `${protocol}//${host}${pathname}?${query.toString()}`;
        if(window.history.state == null){
          window.history.pushState({ prevUrl: window.location.href}, "", newUrl);
        }
        if(`${window.history.state.prevUrl}` != newUrl){
        window.history.replaceState({ prevUrl: window.location.href}, "", newUrl);
        }
        
      }
    };
  
    return [query, updateUrl];
  };
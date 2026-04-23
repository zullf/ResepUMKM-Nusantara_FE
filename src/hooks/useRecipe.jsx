import { useEffect, useState } from 'react';
import { getResep, searchResep } from '../services/resepService'; 

export default function useRecipes(filters) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const { search, ...otherFilters } = filters;

      let res;
      if (search && search.trim() !== '') {
        res = await searchResep(search, otherFilters); 
      } else {
        res = await getResep(otherFilters); 
      }

      setData(res.data ?? []);
    } catch (err) {
      console.error('Gagal fetch data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      fetchData();
    }, 400); 

    return () => clearTimeout(timeout);
  }, [filters]);

  return {
    data,
    loading,
    refresh: fetchData,
  };
}
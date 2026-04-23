import { useEffect, useState } from 'react';
import { getResep } from '../services/resepService';

export default function useRecipes(filters) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await getResep(filters);
      setData(res.data);
    } catch (err) {
      console.error('Gagal fetch data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [filters]);

  return {
    data,
    loading,
    refresh: fetchData
  };
}
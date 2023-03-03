import {useState, useEffect} from 'react';
import axios from '../utils/axios';
import { BookEntity } from 'types';

export const useBooksList = (searchTerm: string) => {
  const [result, setResult] = useState<Array<BookEntity>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    axios.get('/volumes', { params: { q: searchTerm } })
      .then(response => setResult(response.data.items))
      .catch(error => setError(error))
      .finally(() => setLoading(false))
  }, [searchTerm]);

  return {result, loading, error};
}

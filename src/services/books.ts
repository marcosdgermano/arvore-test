import {useState, useEffect} from 'react';
import axios from '../utils/axios';
import { filterBooks } from '@services/filters';
import { BookEntity } from 'types/books';
import { FiltersType } from 'types/filters';

type AdditionalParamsType = {
  startIndex?: number,
  maxResults?: number,
}

export const useBooksList = (searchTerm: string, additionalParams?: AdditionalParamsType, filters?: FiltersType) => {
  const [result, setResult] = useState<Array<BookEntity>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    setLoading(true);
    axios.get('/volumes', { params: { q: searchTerm, ...additionalParams } })
      .then(response => {
        let books;
        if (filters) {
          books = filterBooks(response.data.items, filters);
        } else {
          books = response.data.items;
        }

        console.log('result >>>>>>', books);
        setResult(books)
      })
      .catch(error => setError(error))
      .finally(() => setLoading(false))
  }, [searchTerm]);

  return {result, loading, error};
}

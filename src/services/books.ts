import {useState, useEffect} from 'react';
import axios from '../utils/axios';
import { BookEntity } from 'types';

type AdditionalParamsType = {
  startIndex?: number,
  maxResults?: number,
}

type FiltersType = {
  download?: 'pdf' | 'epub',
  saleability?: 'NOT_FOR_SALE' | 'FOR_SALE'
}

const parseBooks = (books: Array<BookEntity>, filters: FiltersType) => {
  let parsedBooks = books;
  const { download, saleability } = filters;
  if (download) {
    parsedBooks = parsedBooks.filter(book => book.accessInfo[download].isAvailable)
  }

  if (saleability) {
    parsedBooks = parsedBooks.filter(book => book.saleInfo.saleability === saleability)
  }

  return parsedBooks;
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
          books = parseBooks(response.data.items, filters);
        } else {
          books = response.data.items;
        }

        setResult(books)
      })
      .catch(error => setError(error))
      .finally(() => setLoading(false))
  }, [searchTerm]);

  return {result, loading, error};
}

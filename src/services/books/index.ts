import axios from '@utils/axios';
import { filterBooks } from '@services/filters';
import { FiltersType } from 'types/filters';

type AdditionalParamsType = {
  startIndex?: number,
  maxResults?: number,
}

export const requestBooks = async (searchTerm: string, additionalParams?: AdditionalParamsType, filters?: FiltersType) => {
  try {
    const response = await axios.get('/volumes', { params: { q: searchTerm, ...additionalParams } });
    let books;

    if (filters) {
      books = filterBooks(response.data.items, filters);
    } else {
      books = response.data.items;
    }

    return { result: books, error: null };
  } catch (error) {
    return { result: [], error }
  }
}

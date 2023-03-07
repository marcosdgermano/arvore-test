import { Entries } from 'types/generic';
import { BookEntity } from "types/books";
import { FiltersType, DownloadFilterType, SaleabilityFilterType } from 'types/filters';
import { parseFilters } from '@utils/helpers';

const filterFunctions = {
  download: (book: BookEntity, filter: DownloadFilterType) => book.accessInfo[filter].isAvailable,
  saleability: (book: BookEntity, filter: SaleabilityFilterType) => book.saleInfo.saleability === filter ,
  price: (book: BookEntity, filter:  string) => {
    const prices: string[] = filter.split('~');
    const amount = book.saleInfo.listPrice?.amount

    if (!prices.length || !amount){
      return false;
    } else if (prices.length === 1) {
      return prices[0] && (amount > parseFloat(prices[0]));
    } else {
      return prices[0] && prices[1] && parseFloat(prices[1]) > amount && amount > parseFloat(prices[0])
    }
  }
}

export const filterBooks = (books: Array<BookEntity>, filters: FiltersType) => {
  const entries = Object.entries(filters) as Entries<FiltersType>;
  return entries.reduce((acc, curr) => {
    return acc?.filter((book) => curr && filterFunctions[curr[0]](book, curr[1] as never));
  }, books)
}

export const useFilters = (queryString: string) => {
  const selectedFilters = parseFilters(queryString);
  const allFilters = [
    {
      name: 'price',
      display: 'Preço',
      values: ['0~30', '31~50', '51~100', '100'],
      selectedValue: '',
    },
    {
      name: 'saleability',
      display: 'Disponibilidade para venda',
      values: ['FOR_SALE', 'NOT_FOR_SALE'],
      selectedValue: '',
    },
    {
      name: 'download',
      display: 'Formatos disponíveis',
      values: ['pdf', 'epub'],
      selectedValue: '',
    }
  ]

  allFilters.forEach(filter => {
    filter.selectedValue = selectedFilters[filter.name] || ''
  })

  return { selectedFilters, allFilters }
}
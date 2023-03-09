import queryString from 'query-string';
import { BookEntity } from 'types/books'

export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

const allowedFilters = ['price', 'saleability', 'download']

export function parseFilters(qs: string) {
  if (!qs) return {};

  const allowedQs = queryString.exclude(qs, (name) => !allowedFilters.includes(name))

  return queryString.parse(allowedQs) as { [index: string]: string };
}

export const filtersDictionary: { [index: string]: string } = {
  'pdf': 'PDF',
  'epub': 'e-pub',
  'FOR_SALE': 'Disponível',
  'NOT_FOR_SALE': 'Indisponível',
  '0~30': 'de R$0 até R$30',
  '31~50': 'de R$31 até R$50',
  '51~100': 'de R$51 até R$100',
  '100': 'Mais de R$100'
}

export function getImgLink(book: BookEntity) {
  const { imageLinks } = book.volumeInfo;
  return imageLinks?.thumbnail || imageLinks?.smallThumbnail  || '/public/assets/sem-capa.png';
}

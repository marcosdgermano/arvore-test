import queryString from 'query-string';
import { capitalizeFirstLetter, parseFilters } from './helpers';

jest.mock('query-string', () => ({
  exclude: jest.fn(),
  parse: jest.fn().mockReturnValue({}),
}));

describe('capitalizeFirstLetter', () => {
  test('capitalizes the first letter of a string', () => {
    expect(capitalizeFirstLetter('hello world')).toBe('Hello world');
  });

  test('returns an empty string if given an empty string', () => {
    expect(capitalizeFirstLetter('')).toBe('');
  });
});

describe('parseFilters', () => {
  test('returns an empty object when given an empty string', () => {
    expect(parseFilters('')).toEqual({});
  });

  test('calls queryString.exclude with allowed filters', () => {
    const qs = 'price=100&saleability=FOR_SALE&author=John%20Doe';
    parseFilters(qs);
    expect(queryString.exclude).toHaveBeenCalledWith(qs, expect.any(Function));
    expect(queryString.exclude.mock.calls[0][1]('price')).toBe(false);
    expect(queryString.exclude.mock.calls[0][1]('saleability')).toBe(false);
    expect(queryString.exclude.mock.calls[0][1]('author')).toBe(true);
  });

  test('returns an object with allowed filters', () => {
    const qs = 'price=100&saleability=FOR_SALE&download=epub&not=filter';

    queryString.exclude.mockReturnValue('price=100&saleability=FOR_SALE&download=epub');
    queryString.parse.mockReturnValue({ price: '100', saleability: 'FOR_SALE', download: 'epub' });

    const filters = parseFilters(qs);

    expect(filters).toEqual({
      price: '100',
      saleability: 'FOR_SALE',
      download: 'epub',
    });
  });
});

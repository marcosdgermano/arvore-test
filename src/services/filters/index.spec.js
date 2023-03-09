import { filterBooks, useFilters } from './index';

jest.mock('query-string', () => ({
  _esModule: true,
}));

jest.mock('@utils/helpers', () => ({
  parseFilters: jest.fn(() => ({
    price: '0~30',
    saleability: 'FOR_SALE',
    download: 'pdf',
  })),
}));

// eslint-disable-next-line max-lines-per-function
describe('filterBooks', () => {
  const books = [
    {
      id: '1',
      volumeInfo: {
        title: 'Book 1',
      },
      saleInfo: {
        saleability: 'FOR_SALE',
        listPrice: {
          amount: 25,
        },
      },
      accessInfo: {
        pdf: {
          isAvailable: true,
        },
      },
    },
    {
      id: '2',
      volumeInfo: {
        title: 'Book 2',
      },
      saleInfo: {
        saleability: 'FOR_SALE',
        listPrice: {
          amount: 40,
        },
      },
      accessInfo: {
        epub: {
          isAvailable: true,
        },
      },
    },
    {
      id: '3',
      volumeInfo: {
        title: 'Book 3',
      },
      saleInfo: {
        saleability: 'NOT_FOR_SALE',
      },
      accessInfo: {
        pdf: {
          isAvailable: false,
        },
      },
    },
  ];

  it('should return the correct filtered books', () => {
    let filters = {
      price: '0~30',
      saleability: 'FOR_SALE',
      download: 'pdf',
    };

    expect(filterBooks(books, filters)).toEqual([
      {
        id: '1',
        volumeInfo: {
          title: 'Book 1',
        },
        saleInfo: {
          saleability: 'FOR_SALE',
          listPrice: {
            amount: 25,
          },
        },
        accessInfo: {
          pdf: {
            isAvailable: true,
          },
        },
      },
    ]);

    filters = {
      price: '100',
    };

    expect(filterBooks(books, filters)).toEqual([]);
  });
});

describe('useFilters', () => {
  it('should return the correct selectedFilters and allFilters', () => {
    const expectedSelectedFilters = {
      price: '0~30',
      saleability: 'FOR_SALE',
      download: 'pdf',
    };

    const expectedAllFilters = [
      {
        name: 'price',
        display: 'Preço',
        values: ['0~30', '31~50', '51~100', '100'],
        selectedValue: '0~30',
      },
      {
        name: 'saleability',
        display: 'Disponibilidade para venda',
        values: ['FOR_SALE', 'NOT_FOR_SALE'],
        selectedValue: 'FOR_SALE',
      },
      {
        name: 'download',
        display: 'Formatos disponíveis',
        values: ['pdf', 'epub'],
        selectedValue: 'pdf',
      },
    ];

    expect(useFilters('')).toEqual({
      selectedFilters: expectedSelectedFilters,
      allFilters: expectedAllFilters,
    });
  });
});

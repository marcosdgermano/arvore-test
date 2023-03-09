import axios from '@utils/axios';
import { filterBooks } from '@services/filters';
import { requestBooks } from './index';

jest.mock('@utils/axios');
jest.mock('@services/filters');
jest.mock('query-string', () => ({
  _esModule: true,
}));

// eslint-disable-next-line max-lines-per-function
describe('requestBooks', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return books when the request succeeds', async () => {
    const searchTerm = 'test';
    const additionalParams = { startIndex: 0, maxResults: 10 };
    const filters = { download: 'pdf', saleability: 'FOR_SALE' };
    const mockedResponse = {
      data: {
        items: [
          {
            id: '1',
            volumeInfo: {
              title: 'Book 1',
              imageLinks: {
                thumbnail: 'http://example.com/book1-thumbnail.jpg',
              },
            },
          },
          {
            id: '2',
            volumeInfo: {
              title: 'Book 2',
              imageLinks: {
                thumbnail: 'http://example.com/book2-thumbnail.jpg',
              },
            },
          },
        ],
      },
    };

    axios.get.mockResolvedValue(mockedResponse);
    filterBooks.mockReturnValue(mockedResponse.data.items);

    const result = await requestBooks(searchTerm, additionalParams, filters);

    expect(axios.get).toHaveBeenCalledWith('/volumes', {
      params: {
        q: searchTerm,
        ...additionalParams,
      },
    });

    expect(filterBooks).toHaveBeenCalledWith(mockedResponse.data.items, filters);

    expect(result).toEqual({ result: mockedResponse.data.items, error: null });
  });

  it('should return books when the request succeeds without filters', async () => {
    const searchTerm = 'test';
    const additionalParams = { startIndex: 0, maxResults: 10 };
    const filters = {};
    const mockedResponse = {
      data: {
        items: [
          {
            id: '1',
            volumeInfo: {
              title: 'Book 1',
              imageLinks: {
                thumbnail: 'http://example.com/book1-thumbnail.jpg',
              },
            },
          },
          {
            id: '2',
            volumeInfo: {
              title: 'Book 2',
              imageLinks: {
                thumbnail: 'http://example.com/book2-thumbnail.jpg',
              },
            },
          },
        ],
      },
    };

    axios.get.mockResolvedValue(mockedResponse);
    filterBooks.mockReturnValue(mockedResponse.data.items);

    const result = await requestBooks(searchTerm, additionalParams, filters);

    expect(axios.get).toHaveBeenCalledWith('/volumes', {
      params: {
        q: searchTerm,
        ...additionalParams,
      },
    });

    expect(filterBooks).toHaveBeenCalledWith(mockedResponse.data.items, filters);

    expect(result).toEqual({ result: mockedResponse.data.items, error: null });
  });

  it('should return an empty result array when the request fails', async () => {
    const searchTerm = 'test';
    const additionalParams = { startIndex: 0, maxResults: 10 };
    const filters = { download: 'pdf', saleability: 'FOR_SALE' };
    const mockedError = new Error('Request failed');

    axios.get.mockRejectedValue(mockedError);

    const result = await requestBooks(searchTerm, additionalParams, filters);

    expect(axios.get).toHaveBeenCalledWith('/volumes', {
      params: {
        q: searchTerm,
        ...additionalParams,
      },
    });

    expect(filterBooks).not.toHaveBeenCalled();

    expect(result).toEqual({ result: [], error: mockedError });
  });
});

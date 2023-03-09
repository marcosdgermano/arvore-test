import React from 'react';
import { mount } from 'enzyme';
import { requestBooks } from '@services/books';
import { Search } from './index';
import { actWait } from '../../utils/test-utilities';

jest.mock('@services/books');
jest.mock('query-string', () => ({
  parse: jest.fn().mockReturnValue({ q: 'book' }),
  stringify: jest.fn().mockReturnValue('q=book'),
}));
jest.mock('react-router-dom', () => ({
  useHistory: () => ({ location: { search: '' } }),
}));

class IntersectionObserver {
  observe() {}
  unobserve() {}
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: IntersectionObserver,
});

// eslint-disable-next-line max-lines-per-function
describe('Search component', () => {
  let wrapper;
  const mockBooks = [
    {
      id: '1',
      volumeInfo: {
        title: 'Book 1',
        authors: ['Author 1'],
        imageLinks: {
          thumbnail: 'https://example.com/book1-thumbnail.jpg',
          smallThumbnail: 'https://example.com/book1-small-thumbnail.jpg',
        },
      },
    },
    {
      id: '2',
      volumeInfo: {
        title: 'Book 2',
        authors: ['Author 2'],
        imageLinks: {
          thumbnail: 'https://example.com/book2-thumbnail.jpg',
          smallThumbnail: 'https://example.com/book2-small-thumbnail.jpg',
        },
      },
    },
    {
      id: '3',
      volumeInfo: {
        title: 'Book 3',
        authors: ['Author 3'],
        imageLinks: {
          thumbnail: 'https://example.com/book3-thumbnail.jpg',
          smallThumbnail: 'https://example.com/book3-small-thumbnail.jpg',
        },
      },
    },
    {
      id: '4',
      volumeInfo: {
        title: 'Book 4',
        authors: ['Author 4'],
        imageLinks: {
          thumbnail: 'https://example.com/book4-thumbnail.jpg',
          smallThumbnail: 'https://example.com/book4-small-thumbnail.jpg',
        },
      },
    },
    {
      id: '5',
      volumeInfo: {
        title: 'Book 5',
        authors: ['Author 5'],
        imageLinks: {
          thumbnail: 'https://example.com/book5-thumbnail.jpg',
          smallThumbnail: 'https://example.com/book5-small-thumbnail.jpg',
        },
      },
    },
  ];

  const mockRequestBooks = requestBooks;

  window.scrollTo = jest.fn();

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should fetch books and display them', async () => {
    mockRequestBooks.mockReturnValue({ result: mockBooks });
    wrapper = mount(<Search />);

    await actWait();
    wrapper.update();

    expect(wrapper.find('h2').at(1).text()).toEqual(`Resultados para "book"`);
    expect(wrapper.find('.StyledItem')).toHaveLength(5);
  });

  it('should display an error message when there is an error', async () => {
    mockRequestBooks.mockReturnValue({ error: new Error('Error') });
    wrapper = mount(<Search />);

    await actWait();
    wrapper.update();

    expect(wrapper.find('.Error')).toHaveLength(1);
    expect(wrapper.find('.FiltersWrapper')).toHaveLength(0);
    expect(wrapper.find('.ListWrapper')).toHaveLength(0);
  });

  it('should display a loading message when loading', async () => {
    mockRequestBooks.mockReturnValue({ result: mockBooks });
    wrapper = mount(<Search />);

    expect(wrapper.find('.Loading')).toHaveLength(1);
    expect(wrapper.find('.ListWrapperCard')).toHaveLength(0);

    await actWait();
    wrapper.update();

    expect(wrapper.find('.Loading')).toHaveLength(0);
    expect(wrapper.find('.ListWrapper')).toHaveLength(1);
  });
});

import React from 'react';
import { mount } from 'enzyme';
import { requestBooks } from '@services/books';
import Carousel from './index';
import { actWait } from '../../utils/test-utilities';

jest.mock('@services/books');
jest.mock('query-string', () => ({
  _esModule: true,
}));

const mockBooks = [
  {
    id: '1',
    volumeInfo: {
      imageLinks: {
        thumbnail: 'https://example.com/book1-thumbnail.jpg',
        smallThumbnail: 'https://example.com/book1-small-thumbnail.jpg',
      },
    },
  },
  {
    id: '2',
    volumeInfo: {
      imageLinks: {
        thumbnail: null,
        smallThumbnail: 'https://example.com/book2-small-thumbnail.jpg',
      },
    },
  },
  {
    id: '3',
    volumeInfo: {
      imageLinks: {
        thumbnail: 'https://example.com/book3-thumbnail.jpg',
        smallThumbnail: null,
      },
    },
  },
];

describe('Carousel', () => {
  const mockRequestBooks = requestBooks;
  mockRequestBooks.mockImplementation(async () => ({ result: mockBooks, error: null }));

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('displays an error message if books cannot be fetched', async () => {
    const mockError = new Error('Failed to fetch books');

    mockRequestBooks.mockImplementation(async () => ({ result: [], error: mockError }));
    const wrapper = mount(<Carousel searchTerm="react" />);

    await actWait();
    wrapper.update();

    expect(wrapper.find('.Error')).toHaveLength(1);
    expect(wrapper.find('.Error').text()).toContain('Failed to load carousel');
  });

  it('displays a list of books when they are fetched successfully', async () => {
    const wrapper = mount(<Carousel searchTerm="react" />);

    await actWait();
    wrapper.update();

    expect(wrapper.find('.ListItem')).toHaveLength(3);
    expect(wrapper.find('.BookImg')).toHaveLength(3);
    expect(wrapper.find('.BookImg').at(0).prop('src')).toBe('https://example.com/book1-thumbnail.jpg');
    expect(wrapper.find('.BookImg').at(1).prop('src')).toBe('https://example.com/book2-small-thumbnail.jpg');
    expect(wrapper.find('.BookImg').at(2).prop('src')).toBe('https://example.com/book3-thumbnail.jpg');
  });

  it('scrolls the carousel when arrow buttons are clicked', async () => {
    const wrapper = mount(<Carousel searchTerm="react" />);

    await actWait();
    wrapper.update();

    const carouselRef = wrapper.find('.CardsWrapper').getDOMNode();

    Object.defineProperty(carouselRef, 'scrollBy', {
      value: jest.fn(),
      configurable: true,
    });

    jest.spyOn(carouselRef, 'scrollBy');

    wrapper.find('.StyledButton').at(0).simulate('click');
    expect(carouselRef.scrollBy).toHaveBeenCalledWith({ left: -0, behavior: 'smooth' });

    wrapper.find('.StyledButton').at(1).simulate('click');
    expect(carouselRef.scrollBy).toHaveBeenCalledWith({ left: 0, behavior: 'smooth' });
  });
});

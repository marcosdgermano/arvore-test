import React from 'react';
import { mount } from 'enzyme';
import Card from './index';

jest.mock('query-string', () => ({
  _esModule: true,
}));

const bookCard = {
  id: '1',
  volumeInfo: {
    title: 'Example Book',
    imageLinks: {
      thumbnail: 'https://example.com/book-thumbnail.jpg',
      smallThumbnail: 'https://example.com/book-small-thumbnail.jpg',
    },
  },
};

describe('Card component', () => {
  it('renders an image with the correct source and alt text', () => {
    const wrapper = mount(<Card card={bookCard} />);
    const img = wrapper.find('img');

    expect(img.prop('src')).toEqual(bookCard.volumeInfo.imageLinks.thumbnail);
    expect(img.prop('alt')).toEqual(bookCard.volumeInfo.title);
  });
});

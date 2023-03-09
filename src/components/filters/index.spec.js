import React from 'react';
import { mount } from 'enzyme';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import Filters from './index';

jest.mock('react-router-dom', () => ({
  useHistory: jest.fn(),
}));

jest.mock('query-string', () => ({
  parse: jest.fn(),
  stringify: jest.fn(),
}));

describe('Filters component', () => {
  let filters;
  let cleanFilters;
  const history = {
    location: {
      search: '?saleability=FOR_SALE&download=pdf',
    },
  };

  useHistory.mockReturnValue(history);

  beforeEach(() => {
    filters = [
      {
        name: 'price',
        display: 'Preço',
        values: ['0~30', '31~50', '51~100', '100'],
        selectedValue: '0~30',
      },
    ];

    cleanFilters = jest.fn();

    queryString.parse.mockReturnValue({
      saleability: 'FOR_SALE',
      download: 'pdf',
    });

    queryString.stringify.mockReturnValue('price=0~30&saleability=FOR_SALE&download=pdf');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render correctly', () => {
    const wrapper = mount(<Filters filters={filters} cleanFilters={cleanFilters} />);

    expect(wrapper.exists()).toBeTruthy();
  });

  it('should call cleanFilters when the clean button is clicked', () => {
    const wrapper = mount(<Filters filters={filters} cleanFilters={cleanFilters} />);
    const cleanButton = wrapper.find('.CleanButton');

    expect(cleanButton.length).toBe(1);

    cleanButton.simulate('click');

    expect(cleanFilters).toHaveBeenCalled();
  });

  it('should generate the correct link', async () => {
    const wrapper = mount(<Filters filters={filters} cleanFilters={cleanFilters} />);

    const checkboxes = wrapper.find('Checkbox');
    const firstCheckbox = checkboxes.first();

    expect(firstCheckbox.prop('link')).toBe('/search?price=0~30&saleability=FOR_SALE&download=pdf');
  });
});

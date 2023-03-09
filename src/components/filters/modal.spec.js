import React from 'react';
import { mount } from 'enzyme';
import Checkbox from '@components/checkbox';
import queryString from 'query-string';
import FiltersModal from './modal';
import { actWait } from '../../utils/test-utilities';

jest.mock('react-router-dom', () => ({
  useHistory: () => ({
    location: {
      pathname: '/products',
      search: '?q=shoes',
    },
    push: jest.fn(),
  }),
}));

jest.mock('query-string', () => ({
  parse: jest.fn(),
  stringify: jest.fn(),
}));

describe('FiltersModal', () => {
  const filters = [
    {
      name: 'price',
      display: 'Preço',
      values: ['0~30', '30~60', '60~100', '100~150'],
    },
  ];

  const props = {
    filters,
    visible: true,
    onClose: jest.fn(),
  };

  queryString.parse.mockReturnValue({
    price: '0~30',
  });

  let wrapper;

  beforeEach(async () => {
    jest.clearAllMocks();
    wrapper = mount(<FiltersModal {...props} />);
    await actWait();
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('should render correctly', () => {
    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find('.ModalWrapper')).toHaveLength(1);
  });

  it('should update selected filters when checkbox is clicked', async () => {
    const checkbox = wrapper.find(Checkbox).first();
    checkbox.simulate('click');

    await actWait(10);
    wrapper.update();

    expect(checkbox.prop('checked')).toBe(true);
  });

  it('should call submitFilter when submit button is clicked', async () => {
    const submitButton = wrapper.find('button').last();
    submitButton.simulate('click');

    await actWait();
    wrapper.update();

    expect(queryString.stringify).toHaveBeenCalledWith({ price: '0~30' });
    expect(wrapper.find(FiltersModal).prop('onClose')).toHaveBeenCalled();
  });
});

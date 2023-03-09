import React from 'react';
import { mount } from 'enzyme';
import Checkbox from './index';

jest.mock('query-string', () => ({
  _esModule: true,
}));

describe('<Checkbox />', () => {
  const onSelect = jest.fn();

  const defaultProps = {
    value: 'filter-value',
    onSelect,
  };

  const setup = (props = {}) => {
    const finalProps = { ...defaultProps, ...props };
    return mount(<Checkbox {...finalProps} />);
  };

  it('renders without errors', () => {
    const wrapper = setup();
    expect(wrapper.find(Checkbox)).toHaveLength(1);
  });

  it('calls onSelect when clicked', () => {
    const wrapper = setup();
    wrapper.simulate('click');
    expect(onSelect).toHaveBeenCalledTimes(1);
  });

  it('renders a link when onSelect is not defined', () => {
    const wrapper = setup({ onSelect: undefined, link: 'https://example.com' });
    expect(wrapper.find('a')).toHaveLength(1);
  });

  it('renders a div when onSelect is defined', () => {
    const wrapper = setup();
    expect(wrapper.find('div')).toHaveLength(1);
  });

  it('sets the checked class when checked is true', () => {
    const wrapper = setup({ checked: true });
    expect(wrapper.find('span').prop('checked')).toBe(true);
  });

  it('does not set the checked class when checked is false', () => {
    const wrapper = setup({ checked: false });
    expect(wrapper.find('span').prop('checked')).toBe(false);
  });
});

import React from 'react';
import { mount } from 'enzyme';
import GlobalStyle from '../global-style';

describe('Global style', () => {
  it('Render correctly', () => {
    const wrapper = mount(<GlobalStyle />);
    expect(wrapper.exists()).toBe(true);
  });
});

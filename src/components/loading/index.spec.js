import React from 'react';
import { mount } from 'enzyme';
import Loading from './index';

describe('Loading component', () => {
  it('should render correctly', () => {
    const wrapper = mount(<Loading />);

    console.log(wrapper.debug());

    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find('.Loading').exists()).toBeTruthy();
    expect(wrapper.find('div').length).toBe(6);
    wrapper.unmount();
  });
});

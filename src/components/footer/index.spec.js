import React from 'react';
import { mount } from 'enzyme';
import Footer from './index';

describe('Footer', () => {
  it('should render correctly', () => {
    const wrapper = mount(<Footer />);

    expect(wrapper.exists()).toBeTruthy();

    expect(wrapper.find('.CopyrightText').text()).toEqual('Copyright © 2021 Árvore. Todos os direitos reservados.');
    expect(wrapper.find('.FooterButton').at(0).text()).toContain('Política de privacidade');
    expect(wrapper.find('.FooterButton').at(1).text()).toContain('Ajuda');
  });
});

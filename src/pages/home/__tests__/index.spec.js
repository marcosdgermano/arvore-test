import React from 'react';
import { mount } from 'enzyme';
import { Home } from '../index';

describe('<Home />', () => {
  it('Render component', () => {
    const wrapper = mount(<Home history={{ push: jest.fn() }} pocId={1} />);

    expect(wrapper.isEmptyRender()).toBe(false);
  });

  it('Render error', () => {
    const wrapper = mount(<Home error={{ message: 'Error' }} />);

    expect(wrapper.find('span').text()).toEqual('Ocorreu um erro, tente novamente mais tarde!');
  });

  it('Render no result', () => {
    const wrapper = mount(<Home noResult={true} />);

    expect(wrapper.find('span').text()).toEqual('Nenhum distribuidor para este endereço');
  });

  it('Render loading', () => {
    const wrapper = mount(<Home loading />);

    expect(wrapper.find('Loading')).toHaveLength(1);
  });
});

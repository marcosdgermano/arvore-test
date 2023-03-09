import React from 'react';
import { mount } from 'enzyme';
import Home from './index';
import { actWait } from '../../utils/test-utilities';

jest.mock('query-string', () => ({
  _esModule: true,
}));
jest.mock('@services/books', () => ({
  requestBooks: () => ({ result: [], error: null }),
}));

describe('<Home />', () => {
  it('renders three <Carousel /> components', async () => {
    const wrapper = mount(<Home />);

    await actWait();
    wrapper.update();

    expect(wrapper.find('Carousel')).toHaveLength(3);
  });

  it('renders a highlighted <Carousel /> component', async () => {
    const wrapper = mount(<Home />);

    await actWait();
    wrapper.update();

    expect(wrapper.find('Carousel[isHighlighted=true]')).toHaveLength(1);
  });
});

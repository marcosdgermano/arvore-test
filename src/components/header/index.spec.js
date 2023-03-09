import React from 'react';
import { mount } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import Header from './index';

jest.mock('react-router-dom', () => ({
  _esModule: true,
  useHistory: () => ({ replace: jest.fn() }),
}));

describe('Header', () => {
  it('renders the logo image', () => {
    const wrapper = mount(<Header />);
    const logo = wrapper.find('.StyledLogo img');
    expect(logo.prop('src')).toBe('/public/assets/logo.png');
  });

  it('updates term state when input changes', async () => {
    const mockHistory = {
      push: jest.fn(),
    };
    const wrapper = mount(
      <Router>
        <Header />
      </Router>
    );

    const input = wrapper.find('.StyledDesktopInput');
    input.simulate('change', { target: { value: 'search term' } });
    input.simulate('keydown', { key: 'Enter' });

    expect(spy).toHaveBeenCalled();
  });
});

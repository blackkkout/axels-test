import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';

import { NavLink } from '../components/NavLink';

describe('NavLink', () => {
  it('should take a snapshot', () => {
    const view = render(
      <BrowserRouter>
        <NavLink to="/test">Test Link</NavLink>
      </BrowserRouter>,
    );
    expect(view).toMatchSnapshot();
  });
});

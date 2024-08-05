import { render } from '@testing-library/react';

import { App } from './App';

describe('App', () => {
  it('should take a snapshot', () => {
    const view = render(<App />);
    expect(view).toMatchSnapshot();
  });
});

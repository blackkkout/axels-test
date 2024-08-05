import { render } from '@testing-library/react';

import { Confirmation } from '../components/Confirmation';

describe('Confirmation', () => {
  it('should take a snapshot', () => {
    const view = render(<Confirmation />);
    expect(view).toMatchSnapshot();
  });
});

import { render } from '@testing-library/react';

import KeyboardRenderer from './keyboard-renderer';

describe('KeyboardRenderer', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<KeyboardRenderer />);
    expect(baseElement).toBeTruthy();
  });
});

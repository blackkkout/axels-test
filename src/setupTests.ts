// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

class MockGeolocationPositionError
  extends Error
  implements GeolocationPositionError
{
  code: number;
  message: string;
  readonly PERMISSION_DENIED: 1 = 1;
  readonly POSITION_UNAVAILABLE: 2 = 2;
  readonly TIMEOUT: 3 = 3;

  constructor(message: string, code: number = 1) {
    super(message);
    this.name = 'GeolocationPositionError';
    this.code = code;
    this.message = message;
  }
}

(global as any).GeolocationPositionError = MockGeolocationPositionError;

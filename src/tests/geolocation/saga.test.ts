import { call, put } from 'redux-saga/effects';

import {
  getGeolocation,
  geolocationActions,
  requestGeolocation,
} from '../../redux/ducks/geolocation';

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

describe('getGeolocation saga', () => {
  it('should get geolocation successfully', () => {
    const generator = getGeolocation();

    const mockPosition: GeolocationPosition = {
      coords: {
        latitude: 1,
        longitude: 2,
        altitude: 3,
        accuracy: 4,
        altitudeAccuracy: 5,
        heading: 6,
        speed: 7,
      },
      timestamp: 8,
    };

    const mockSerializedPosition = {
      coords: {
        latitude: 1,
        longitude: 2,
        altitude: 3,
        accuracy: 4,
        altitudeAccuracy: 5,
        heading: 6,
        speed: 7,
      },
      timestamp: 8,
    };

    expect(generator.next().value).toEqual(call(requestGeolocation));

    expect(generator.next(mockPosition).value).toEqual(
      put(geolocationActions.setGeolocation(mockSerializedPosition)),
    );

    expect(generator.next().done).toBeTruthy();
  });

  it('should handle geolocation error', () => {
    const generator = getGeolocation();

    expect(generator.next().value).toEqual(call(requestGeolocation));

    const mockError = new MockGeolocationPositionError(
      'Geolocation request error happened',
      MockGeolocationPositionError.prototype.TIMEOUT,
    );

    expect(generator.throw(mockError).value).toEqual(
      put(geolocationActions.setError('Geolocation request error happened')),
    );

    expect(generator.next().done).toBeTruthy();
  });
});

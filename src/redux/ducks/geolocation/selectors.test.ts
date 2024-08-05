import { RootState } from '../../store';
import { geolocationErrorSelector, geolocationSelector } from './geolocation';

describe('geolocation selectors', () => {
  const mockState: RootState = {
    geolocation: {
      position: {
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
      },
      error: null,
    },
  } as RootState;

  it('should select geolocation position', () => {
    expect(geolocationSelector(mockState)).toEqual({
      latitude: 1,
      longitude: 2,
      altitude: 3,
      accuracy: 4,
      altitudeAccuracy: 5,
      heading: 6,
      speed: 7,
    });
  });

  it('should select geolocation error', () => {
    expect(geolocationErrorSelector(mockState)).toEqual(null);
  });
});

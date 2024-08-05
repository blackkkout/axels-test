import {
  geolocationActions,
  geolocationReducer,
  GeolocationState,
  serializeGeolocationPosition,
} from './geolocation';

describe('geolocationReducer', () => {
  const initialState: GeolocationState = {
    position: null,
    error: null,
  };

  const mockGeolocationPosition = {
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

  it('should handle initial state', () => {
    expect(geolocationReducer(undefined, { type: 'unknown' })).toEqual(
      initialState,
    );
  });

  it('should handle setGeolocation', () => {
    const actual = geolocationReducer(
      initialState,
      geolocationActions.setGeolocation(mockGeolocationPosition),
    );
    expect(actual.position).toEqual(mockGeolocationPosition);
  });

  it('should serialize geolocation position', () => {
    const mockGeolocationPositionNonSerialized =
      mockGeolocationPosition as GeolocationPosition;
    const actual = geolocationReducer(
      initialState,
      geolocationActions.setGeolocation(
        serializeGeolocationPosition(mockGeolocationPositionNonSerialized),
      ),
    );
    expect(actual.position).toEqual(mockGeolocationPosition);
  });

  it('should handle setError', () => {
    const mockError = 'error';
    const actual = geolocationReducer(
      initialState,
      geolocationActions.setError(mockError),
    );
    expect(actual.error).toEqual(mockError);
  });
});

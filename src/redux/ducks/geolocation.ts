import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { put, call } from 'redux-saga/effects';

import { RootState } from '../store';

interface SerializableGeolocationPosition {
  coords: {
    latitude: number;
    longitude: number;
    altitude: number | null;
    accuracy: number;
    altitudeAccuracy: number | null;
    heading: number | null;
    speed: number | null;
  };
  timestamp: number;
}

const requestGeolocation = async (): Promise<GeolocationPosition> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve(position);
      },
      (error) => {
        reject(error);
      },
    );
  });
};

const serializeGeolocationPosition = (
  position: GeolocationPosition,
): SerializableGeolocationPosition => ({
  coords: {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
    altitude: position.coords.altitude,
    accuracy: position.coords.accuracy,
    altitudeAccuracy: position.coords.altitudeAccuracy,
    heading: position.coords.heading,
    speed: position.coords.speed,
  },
  timestamp: position.timestamp,
});

type GeolocationState = {
  position: SerializableGeolocationPosition | null;
  error: string | null;
};

const initialState: GeolocationState = {
  position: null,
  error: null,
};

export const geolocationSlice = createSlice({
  name: 'geolocation',
  initialState,
  reducers: {
    setGeolocation(
      state,
      action: PayloadAction<SerializableGeolocationPosition>,
    ) {
      state.position = action.payload;
      state.error = null;
    },
    setError(state, action: PayloadAction<string>) {
      state.error = action.payload;
      state.position = null;
    },
  },
});

export const geolocationActions = {
  getGeolocation: createAction(`${geolocationSlice.name}/getGeolocation`),
  setGeolocation: geolocationSlice.actions.setGeolocation,
  setError: geolocationSlice.actions.setError,
} as const;
export const geolocationReducer = geolocationSlice.reducer;

export function* getGeolocation(): Generator<any, void, GeolocationPosition> {
  try {
    const position: GeolocationPosition = yield call(requestGeolocation);
    const serializablePosition = serializeGeolocationPosition(position);
    yield put(geolocationActions.setGeolocation(serializablePosition));
  } catch (error) {
    if (error instanceof GeolocationPositionError) {
      yield put(geolocationActions.setError(error.message));
    }
  }
}

export const geolocationSelector = (
  state: RootState,
): SerializableGeolocationPosition['coords'] | null =>
  state.geolocation.position?.coords ?? null;
export const geolocationErrorSelector = (state: RootState): string | null =>
  state.geolocation.error;

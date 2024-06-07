/* eslint-disable import/no-anonymous-default-export */
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default reducers => {
  const persistedReducers = persistReducer(
    {
      key: 'JA-FERRAGENS-NEGRAO',
      storage,
      whitelist: ['userType'],
    },
    reducers,
  );

  return persistedReducers;
};

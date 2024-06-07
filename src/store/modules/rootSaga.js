import { all } from 'redux-saga/effects';

import userType from './userType/sagas';

export default function* rootSaga() {
  return yield all([userType]);
}

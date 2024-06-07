import { all, takeLatest } from 'redux-saga/effects';
// import { get } from 'lodash';
// import * as actions from './actions';
import * as types from '../types';
// import api from '../../../api/axios';

// function* loginRequest({ payload }) {
//     try {
//         const response = yield call(api.post, '/token/inserir', payload);
//         yield put(actions.loginSuccess({ ...response.data }));

//         api.defaults.headers.Authorization = `Bearer ${response.data.token}`;
//     } catch (error) {
//         yield put(actions.loginFailure);
//     }
// }

function changeUserSolicitante({ payload }) {
    console.log("Mudando para usuario solicitante", payload);
}

function changeUserAprovador({ payload }) {
    console.log("Mudando para usuario aprovador", payload);
}

function changeUserAdmin({ payload }) {
    console.log("Mudando para usuario admin", payload);
}

// function persistRehydrate({ payload }) {
//     const token = get(payload, 'auth.token');
//     if (!token) return;

//     api.defaults.headers.Authorization = `Bearer ${token}`;
// }

export default all([
    takeLatest(types.USER_SOLICITANTE, changeUserSolicitante),
    takeLatest(types.USER_APROVADOR, changeUserAprovador),
    takeLatest(types.USER_ADMIN, changeUserAdmin)
    // takeLatest(types.PERSIST_REHYDRATE, persistRehydrate)
]);

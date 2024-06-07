import * as types from '../types';

export function changeUserSolicitante(payload) {
    return {
        type: types.USER_SOLICITANTE,
        payload
    };
};

export function changeUserAprovador(payload) {
    return {
        type: types.USER_APROVADOR,
        payload
    };
};

export function changeUserAdmin(payload) {
    return {
        type: types.USER_ADMIN,
        payload
    };
};

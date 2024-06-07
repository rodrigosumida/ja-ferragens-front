import * as types from '../types';

const initialState = {
    user: 'SOLICITANTE'
};

// eslint-disable-next-line import/no-anonymous-default-export
export default function (state = initialState, action) {
    switch (action.type) {
        case types.USER_SOLICITANTE: {
            const newState = { ...state };
            newState.user = 'SOLICITANTE';
            return newState;
        }

        case types.USER_APROVADOR: {
            const newState = { ...state };
            newState.user = 'APROVADOR';
            return newState;
        }

        case types.USER_ADMIN: {
            const newState = { ...state };
            newState.user = 'ADMIN';
            return newState;
        }

        default: {
            return state;
        }
    }
}
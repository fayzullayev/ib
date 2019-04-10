import * as actionTypes from '../actions/Actions';

const initialState = {};

const login = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LoginPasswords :
            return {
                ...state,
                ...action.info
            }
    }
    return state;
};
export default login;
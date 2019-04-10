import * as actionTypes from '../actions/Actions';

const initialState = {};

const forgotPassword = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.forgotPasswordCredentials :
            return {
                ...state,
                ...action.info
            }
    }
    return state;
};
export default forgotPassword;
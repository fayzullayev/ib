import  * as actionTypes from  '../actions/Actions';

const initialState = {};

const registration = (state = initialState,action) => {
    switch (action.type) {
        case actionTypes.registrationCredentials:
            return {
                ...state,
                ...action.info
            }
    }
    return state;
};
export default registration;
import * as actionTypes from '../../store/actions/Actions';

const initialState = {
    lang: "ru"
};

const setLanguage = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.currentLanguage :
            return {
                ...state,
                ...action.lang
            }
        default:  
            return {
                ...state};
    }
    // return state;
};
export default setLanguage;
import * as actionTypes from '../actions/Actions';

const initialState = {};

const loading = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.loadingHandler : 
        return {
            ...state,
            ...action.info
        }
    }
    return state;
};
export default loading;
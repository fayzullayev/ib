import * as actionTypes from '../actions/Actions';

const initialState = {};

const deposits = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.deposits : 
        return {
            ...state,
            ...action.info
        }
    }
    return state;
};
export default deposits;
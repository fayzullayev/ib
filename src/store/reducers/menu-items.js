import * as actionTypes from '../actions/Actions';

const initialState = {};

const menuItems = (state = initialState, action) => {
    switch(action.type){
        case actionTypes.menuItems : 
        return {
            ...state,
            ...action.info
        }
    }
    return state;
};
export default menuItems;
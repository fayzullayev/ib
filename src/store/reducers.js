import login from "./reducers/login";
import registration from './reducers/registration';
import forgotPassword from './reducers/forgotPassword';
import setLanguage from './reducers/setLanguage';
import {combineReducers} from "redux";
import menuItems from './reducers/menu-items';
import cardsInfo from './reducers/cardsInfo';
import deposits from './reducers/deposits';
import loadingHandler from './reducers/loadingHandle';

export default combineReducers({login, registration, forgotPassword, setLanguage, menuItems, cardsInfo,deposits,loadingHandler});
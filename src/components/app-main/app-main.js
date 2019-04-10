import React from "react"
import Loadable from 'react-loadable';
import Loading from '../spinner-opacity';
import {Provider} from "react-redux";
import store from '../../store/store';

const LoadableComponent = Loadable({
    loader: () => import('../app'),
    loading: Loading,
});

export default class AppMain extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <LoadableComponent/>
            </Provider>
            );
    }
}
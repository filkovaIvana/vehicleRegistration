import React from 'react';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { render } from "react-dom";
import { Provider } from "react-redux";
import history from './utils/history'
import { Router } from "react-router-dom";
import { store } from "./_helpers";


//////////////////////////////////////////
// Polyfill
//////////////////////////////////////////

if (typeof Object.assign != 'function') {
    Object.assign = function (target) {
        if (target == null) {
            throw new TypeError('Cannot convert undefined or null to object');
        }

        target = Object(target);
        for (var index = 1; index < arguments.length; index++) {
            var source = arguments[index];
            if (source != null) {
                for (var key in source) {
                    if (Object.prototype.hasOwnProperty.call(source, key)) {
                        target[key] = source[key];
                    }
                }
            }
        }
        return target;
    };
}

render(
    <Router history={history}>
        <Provider store={store}>
            <App />
        </Provider>
    </Router>,
    document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

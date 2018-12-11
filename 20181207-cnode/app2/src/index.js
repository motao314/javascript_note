import React from 'react';
import {BrowserRouter} from "react-router-dom";
import ReactDOM from 'react-dom';
import App from "./app";
ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>, 
    document.getElementById('root')
);

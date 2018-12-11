import React from 'react';
import ReactDOM from 'react-dom';
import App from "./app";
import data from "./data"
import * as serviceWorker from './serviceWorker';

// css 和 图片
require("./index.css");
/*
 import 前置依赖   
    导出导入:
        export {a}  
        import {a} from "./app";
        export default App; 
        import App from "./app";

 require 就近依赖
     导出导入:
        exports = {};
        require
*/
ReactDOM.render(
    <App data={data} />, 
    document.getElementById('root')
);
serviceWorker.unregister();

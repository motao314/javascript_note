import React,{Component} from 'react';
let img = require("../common/static/img/404.gif");
export default class Page404 extends Component {
    render(){
        return (<div className={"page-404"}>
            <img src={img} className={"img-404"} />
        </div>);
    }
}


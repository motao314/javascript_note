import React,{Component} from "react";
import PropTypes from "prop-types";
export default class  Children extends Component {
    render(){
        console.log(this.context);
        return (<div>{"hello react"}</div>);
    }
}
Children.contextTypes = {
    title: PropTypes.string
}
/*
*   定义
*
Children.contextTypes = {
   定义要接受的数据及类型
}
* */

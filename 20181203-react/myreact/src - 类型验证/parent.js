import React,{Component} from "react";
import Children from "./children";
import PropTypes from "prop-types";
export default class  Parent extends Component {
    render(){
        console.log(this.props);
        return (<Children info = {this.props.info}/>);
    }
}
Parent.propTypes = {
    info: PropTypes.exact({
        a: PropTypes.any.isRequired ,
        b: PropTypes.number.isRequired
    }),
    title: function (props, propName, componentName) {
        let val = props[propName];
        if(/[\u4e00-\u9fa5]/.test(val)){
            return new Error("不能包含中文");
        }
    }
};
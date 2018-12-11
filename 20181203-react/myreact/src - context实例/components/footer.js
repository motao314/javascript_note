import React from "react";
import PropTypes from "prop-types";
export default function Footer (props,context){
    console.log(props,context);
    let {removeDone,getDone,getUnDone} = context;
    return (<footer className="footer">
        <p>待办{getUnDone().length}项事情</p>
        <a
            href="javascript:;"
            onClick = {removeDone}
        >清除已完成的{getDone().length}项事情</a>
    </footer>);
}
Footer.contextTypes = {
    removeDone: PropTypes.func,
    getDone:PropTypes.func,
    getUnDone: PropTypes.func
};
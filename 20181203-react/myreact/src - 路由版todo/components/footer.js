import React from "react";
export default function Footer (props){
    console.log(props);
    let {removeDone,doneLength,unDoneLength} = props;
    return (<footer className="footer">
        <p>待办{unDoneLength}项事情</p>
        <a
            href="javascript:;"
            onClick = {removeDone}
        >清除已完成的{doneLength}项事情</a>
    </footer>);
}
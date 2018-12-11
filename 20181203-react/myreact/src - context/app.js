import React,{Component} from "react";
import PropTypes from "prop-types";
import Parent from "./parent";
export default class  App extends Component {
    state = {
        title: "这是要传递的标题",
        info: [
            "信息1",
            "信息2"
        ]
    }
    //准备传递下去的数据
    getChildContext(){
        let {title,info} = this.state;
        return {
            title,
            info
        }
    }
    render(){
        return (<div id={"todoApp"}>
            <Parent />
        </div>);
    }
}
App.childContextTypes  = {
    title: PropTypes.string,
    info: PropTypes.array
}

/*
getChildContext(){
    return {
        要传递的数据
    }
}

App.childContextTypes  = {
    定义要传递的数据的类型
}

* */
import React,{Component} from "react";
import Header from "../components/header";
import Add from "../components/add";
export default class Home extends Component {
    render(){
        return (<div>
                <Header title="添加数据" />
                <Add/>
        </div>);
    }
}
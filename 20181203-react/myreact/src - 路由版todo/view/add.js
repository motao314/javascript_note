import React,{Component} from "react";
import Header from "../components/header";
import Add from "../components/add";
export default class Home extends Component {
    render(){
        let {data,add} = this.props;
        return (<div>
                <Header title={"添加事项"} />
                <Add add={add}/>
        </div>);
    }
}
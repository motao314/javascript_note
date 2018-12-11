import React,{Component} from "react";
import Header from "../components/header";
import List from "../components/List";
import Footer from "../components/footer";
export default class Home extends Component {
    render(){
        let {data} = this.props;
        return (<div>
            <Header title={"ToDoList"} />
            <List data={data}/>
            <Footer/>
        </div>);
    }
}
import React,{Component} from "react";
import Header from "../components/header";
import List from "../components/List";
import Footer from "../components/footer";
export default class Done extends Component {
    render(){
        let {data} = this.props;
        return (<div>
            <Header title={"已完成事项"} />
            <List data={data}/>
            <Footer/>
        </div>);
    }
}
import React,{Component} from "react";
import Header from "../components/header";
import List from "../components/List";
import Footer from "../components/footer";
export default class ListPage extends Component {
    render(){
        let {data,title,remove,removeDone,edit,getDone,getUnDone,changeState} = this.props;
        return (<div>
            <Header title={title} />
            <List
                data={data}
                remove = {remove}
                edit = {edit}
                changeState = {changeState}
            />
            <Footer
                removeDone = {removeDone}
                doneLength = {getDone().length}
                unDoneLength = {getUnDone().length}
            />
        </div>);
    }
}
import React,{Component} from "react";
import Header from "../components/header";
import List from "../components/List";
import Footer from "../components/footer";
import PropTypes from "prop-types";
let titles = [
    "ToDos",
    "已完成事项",
    "未完成事项"
];
export default class ListPage extends Component {
    render(){
        let {getData,getDone,getUnDone} = this.context;
        let url = this.props.match.path;
        let data,title;
        switch (url) {
            case "/":
                data =  getData();
                title = titles[0];
                break;
            case "/done":
                data =  getDone();
                title = titles[1];
                break;
            case "/undone":
                data =  getUnDone();
                title = titles[2];
                break;
        }
        console.log(this.props.match.path);
        /*
        /
        /done
        /undone
        * */
        return (<div>
            <Header title = {title} />
            <List data={data} />
            <Footer />
        </div>);
    }
}
ListPage.contextTypes = {
    getData:PropTypes.func,
    getDone:PropTypes.func,
    getUnDone: PropTypes.func
}
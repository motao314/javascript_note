import React,{Component} from "react";
import {connect} from "react-redux";
import List from "../common/components/list";
class ListView extends Component{
    componentDidMount(){
        this.redirect()
    }
    redirect(){
        let {history,match,data} = this.props;
        let {path} = match;
        let doneData = data.filter(item=>item.done);
        let undoneData = data.filter(item=>!item.done);
        if(path === "/"
        && data.length == 0){
            history.push("/add");
        } else if(path === "/done"
        && doneData.length === 0){
            history.push("/");
        }  else if(path === "/undone"
        && undoneData.length === 0){
          history.push("/");
        }
    }
    render(){
        return <List />
    }
}
export default connect(function(state){
    return {
        data:state.todo
    }
})(ListView);

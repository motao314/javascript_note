import React,{Component} from "react";
import {withRouter} from "react-router-dom";
 class  Add extends Component {
    state = {
        val: ""
    }
    render(){
        console.log();
        return (<input
            type="text"
            id="new-todo"
            placeholder="请输入待办事项"
            value = {this.state.value}
            onChange = {(e)=>{
                this.setState({
                    val:e.target.value
                })
            }}
            onKeyDown={(e)=>{
                if(e.keyCode === 13){
                    let {val} = this.state
                    if(val.trim() === ""){
                       alert("请输入有效内容");
                    } else {
                       this.props.addData(val);
                       this.props.history.push("/");
                    }
                }
            }}
        />);

    }
}
export default withRouter(Add);
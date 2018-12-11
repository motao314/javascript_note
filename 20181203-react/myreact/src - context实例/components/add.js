import React,{Component} from "react";
import PropTypes from "prop-types";
export default class  Add extends Component {
    state = {
        val: ""
    }
    render(){
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
                if(e.keyCode == 13){
                    let {val} = this.state
                    if(val.trim() == ""){
                       alert("请输入有效内容");
                    } else {
                       this.context.add(val);
                    }
                }
            }}
        />);
    }
}
Add.contextTypes = {
    add: PropTypes.func
}

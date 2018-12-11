import React,{Component} from "react";
export default class Input extends Component {
    state = {
        val: ""
    }
    render(){
        let {addData} = this.props;
        return (
        <input 
            type="text" 
            id="new-todo" 
            placeholder="请输入待办事项" 
            value={this.state.val} 
            onChange = {(e)=>{
                this.setState({
                    val: e.target.value
                })
            }}   
            onKeyUp = {(e)=>{
                if(e.keyCode === 13){
                    let {val} = this.state;
                    if(val.trim() !== ""){
                        // 添加数据
                        addData(val);
                    }   
                    this.setState({
                        val: ""
                    });
                }
            }} 
        />)
    }
}
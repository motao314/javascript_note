import React,{Component} from "react";
export default class Li extends Component {
    // toEdit=(e)=>{
    //     this.refs.default.style.display = "none";
    //     this.refs.edit.style.display = "block";
    // }
    state = {
        showEdit: false,
        val: this.props.data.text
    }
    render(){
        let {data,removeDate,changeDone,editDate} = this.props;
        let {showEdit,val} = this.state;
        return (
            <li className={data.done?"done":""}>
                <div className="default" style={{
                    display: showEdit?"none":"block"
                }}>
                    <input 
                        type="checkbox" 
                        checked={data.done} 
                        onChange = {(e)=>{
                            changeDone(data.id,e.target.checked);
                        }}    
                    />
                    <p onDoubleClick={()=>{
                         this.setState({
                            showEdit: true
                         });
                    }}>{val}</p>
                    <span 
                        className="close" 
                        onClick = {()=>{
                            removeDate(data.id);
                        }}
                    />
                </div>
                <div 
                    className="edit"  
                    style={{
                        display: showEdit?"block":"none"
                    }}
                >
                    <input 
                        type="text" 
                        value={val}  
                        onChange = {(e)=>{
                            this.setState({
                                val: e.target.value
                            });
                        }}
                        onBlur = {()=>{
                            let {val} = this.state;
                            if(val.trim()==""){
                                val = this.props.data.text
                            }
                            this.setState({
                                showEdit: false,
                                val
                            });
                            editDate(data.id,val);
                        }}
                    />
                </div>
            </li>
        );
    }
}
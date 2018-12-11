import React,{Component} from "react";
export default class  Li extends Component {
    state={
        isEdit: false,
        text: this.props.data.val
    }
    componentDidUpdate(prevProps,prevState) {
        //console.log(prevState);
        if(this.state.isEdit
        && !prevState.isEdit){this.refs.text.select()};
    }
    render(){
        let {data,remove,changeState,edit} = this.props;
        let {isEdit,text} = this.state;
        return (<li className={data.done?"done":""}>
            <div className={"default"}
                style={{
                    display:isEdit?"none":"block"
                }}
            >
                <input
                    type={"checkbox"}
                    checked={data.done}
                    onChange = {(e)=>{
                        changeState(data.id,e.target.checked);
                    }}
                />
                <p
                    onDoubleClick={()=>{
                        this.setState({
                            isEdit: true
                        })
                    }}
                >
                    {data.val}
                </p>
                <span
                    className={"close"}
                    onClick = {
                        ()=>{
                            remove(data.id);
                        }
                    }
                >
                </span>
            </div>
            <div
                className="edit"
                style={{
                    display:isEdit?"block":"none"
                }}
            >
                <input
                    type="text"
                    ref = "text"
                    onChange = {(e)=>{
                        this.setState({
                            text:e.target.value
                        })
                    }}
                    value={text}
                    onBlur={()=>{
                        if(text.trim() === ""){
                            text = data.val
                        }
                        this.setState({
                            text,
                            isEdit: false
                        });
                        edit(data.id,text);
                    }}
                />
            </div>
        </li>);
    }
}
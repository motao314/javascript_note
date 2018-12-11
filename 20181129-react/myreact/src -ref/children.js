import React,{Component} from "react";
export default class Child extends Component {
    state = {
        info: "这是我自己的状态"
    }
    componentDidMount() {
        console.log(this.refs);
        this.refs.p1.style.background = "red";
        this.refs.p1.parentNode.removeChild(this.refs.p1);
    }
    render(){
        return (<div ref="box">
            <p ref="p1">{this.state.info}</p>
            <p>{this.props.data}</p>
        </div>);
    }
}

import React,{Component} from "react";
import Parent from "./parent";
export default class  App extends Component {
    state = {
        info: {
            a: "a",
            b: 2
        }
    }
    render(){
        return (<div id={"todoApp"}>
            <Parent
                info = {this.state.info}
                title={"就要输入一个中文"}
            />
        </div>);
    }
}
import React,{Component} from "react";
import Child from "./children";
export default class App extends Component {
    constructor(arg){
        super(arg);
        this.state = {
            info: "天气不错",
            show: true
        }
    }
    render(){
        return this.state.show?<Child data={this.state.info} />:""
    }
}

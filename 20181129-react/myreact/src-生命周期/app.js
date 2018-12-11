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
    componentDidMount() {
        this.setState({info:"天气热死了"})
        setTimeout(()=>{
            this.setState({show:false})
        },10000)
    }
    render(){
        return this.state.show?<Child data={this.state.info} />:""
    }
}

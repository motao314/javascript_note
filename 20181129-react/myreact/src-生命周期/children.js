import React,{Component} from "react";
export default class Child extends Component {
    constructor(arg){
        super(arg);
        this.state = {
            info: "这是我自己的状态"
        }
        console.log("构造函数");
    }
    componentWillMount() {
        console.log("组件即将被挂载在DOM中");
    }
    componentDidMount() {
        console.log("组件已经挂载在DOM中");
        setTimeout(()=>{
            this.setState({
                info: "我又一个新状态"
            })
        },3000)
    }
    componentWillReceiveProps(newPorps){
        console.log("父组件更新,传入新的props"/*,newPorps,this.props*/);
    }
    shouldComponentUpdate(nextProps, nextState) {
        console.log("组件更新获取到了新的props和state"/*,nextProps, nextState*/);
        return true;
    }
    componentWillUpdate(nextProps, nextState){
        console.log("组件即将更新");
    }
    componentDidUpdate(prevProps, prevState){
        // console.log(prevProps, prevState);
        console.log("组件更新完毕");
    }
    componentWillUnmount() {
        console.log("要被卸载");
    }
    render(){
        console.log("渲染");
        return (<div>
            <p>{this.state.info}</p>
            <p>{this.props.data}</p>
        </div>);
    }
}

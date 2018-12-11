import React,{Component} from "react";
export default class App extends Component {
    constructor(arg){
        super(arg);
        this.state = {
            data:[
                {
                    id: 0,
                    title: "第一个li"
                },{
                    id: 1,
                    title: "第二个li"
                },{
                    id: 2,
                    title: "第三个li"
                },{
                    id: 3,
                    title: "第四个li"
                }
            ]
        }
    }
    componentDidMount() {
        let {data} = this.state;
        data.shift();
        setTimeout(()=>{
            this.setState({
                data
            });
        },3000)
    }
    render(){
        return (
            <ul>
                {
                    this.state.data.map((item)=>{
                        return <li key={item.id}>{item.title}</li>
                    })
                }
            </ul>
        )
    }
}

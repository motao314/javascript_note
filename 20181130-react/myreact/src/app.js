import React,{Component} from "react";
import Input from "./input";
import List from "./list";
import Footer from "./footer";
export default class App extends Component {
    state = {
        data:[
            // {
            //     id: 1,
            //     text: "今天周五",
            //     done: false
            // },{
            //     id: 2,
            //     text: "明天不上班",
            //     done: false
            // },{
            //     id: 3,
            //     text: "准备睡个懒觉",
            //     done: true
            // }
        ]
    }
    removeDate=(id)=>{
        let {data} = this.state;
        data = data.filter(item=>item.id!=id);
        this.setState({
            data
        });
    }
    changeDone = (id,state)=>{
        let {data} = this.state;
        data.forEach(item => {
            if(item.id == id){
                item.done = state;
            }
        });
        this.setState({
            data
        });
    }
    addData=(newInfo)=>{
    //    console.log(newInfo);
       let {data} = this.state;
       //let id = data[data.length-1]?data[data.length-1].id+1:0;
       data.push({
            id: Date.now(),
            text: newInfo,
            done: false
       });
       this.setState({
           data
       });
    }
    editDate=(id,val)=>{
        let {data} = this.state;
        data.forEach(item => {
            if(item.id == id){
                item.text = val;
            }
        });
        this.setState({
            data
        });
    }
    clearDoneData=()=>{
        let {data} = this.state;
        data = data.filter(item=>!item.done);
        this.setState({
            data
        });
    }
    render(){
        let {data} = this.state;
        return (
            <div id="todoApp">
                <h2 className="title">TodoList</h2>
                <Input parent={this} addData={this.addData} />
                <List 
                    data={data} 
                    removeDate = {this.removeDate}
                    changeDone = {this.changeDone}
                    editDate = {this.editDate}
                />
                {data.length>0?<Footer 
                    data={data} 
                    clearDoneData = {this.clearDoneData}    
                />:""}
            </div>
        );
    }
}
import React,{Component} from "react";
import {Switch,Route} from "react-router-dom";
import Add from "./view/add";
import ListPage from "./view/listPage";
export default class  App extends Component {
    state = {
        data:[
            {
                id: 1,
                text:"天气降温了",
                done: true
            },
            {
                id: 2,
                text:"天气又降温了",
                done: false
            }
        ]
    }
    /*添加数据*/
    add = (info)=>{
        let {data} = this.state;
        data.push({
            id: Date.now(),
            text: info,
            done: false
        })
        this.setState({data})
    }
    /*删除数据*/
    remove = (id)=>{
        let {data} = this.state;
        data = data.filter(item=>item.id!=id);
        this.setState({data})
    }
    /*删除已完成数据*/
    removeDone = ()=>{
        let {data} = this.state;
        data = data.filter(item=>!item.done);
        this.setState({data})
    }
    /*修改状态*/
    changeState = (id,state)=>{
        let {data} = this.state;
        data.forEach(item=>{
            if(id == item.id){
                item.done = state;
            }
        });
        this.setState({data})
    }
    /*修改文字*/
    edit = (id,info)=>{
        let {data} = this.state;
        data.forEach(item=>{
            if(id == item.id){
                item.text = info;
            }
        });
        this.setState({data})
    }
    /* 获取所有完成项 */
    getDone=()=>{
        let {data} = this.state;
        return data.filter(item=>item.done);
    }
    /* 获取所有未完成项 */
    getUnDone=()=>{
        let {data} = this.state;
        return data.filter(item=>!item.done);
    }
    render(){
        let {data} = this.state;
        let {add,remove,removeDone,changeState,edit,getDone,getUnDone} = this;
        const EVENT = {
                remove,
                removeDone,
                changeState,
                edit,
                getDone,
                getUnDone
        }
        return (<div id={"todoApp"}>
                <Switch>
                    {/*<Route path={"/"} exact component={Home}/>*/}
                    <Route path={"/"} exact render={()=>{
                        return (<ListPage
                            title={"Todos"}
                            data={data}
                            {...EVENT}
                        />)
                    }}/>
                    <Route path={"/add"} render={()=>{
                        return (
                            <Add add={add}/>
                        )
                    }}/>
                    <Route path={"/done"} render={()=>{
                        return (<ListPage
                                title={"已完成事项"}
                                data={getDone()}
                                {...EVENT}
                            />)
                    }}/>
                    <Route path={"/undone"} render={()=>{
                        return (<ListPage
                            title={"未完成事项"}
                            data={getUnDone()}
                            {...EVENT}
                        />);
                    }}/>
                </Switch>
        </div>);
    }
}
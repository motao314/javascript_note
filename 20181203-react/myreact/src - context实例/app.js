import React,{Component} from "react";
import {Switch,Route} from "react-router-dom";
import PropTypes from "prop-types";
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
    /*获取所有数据*/
    getData = ()=>{
        let {data} = this.state;
        return data;
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
    getChildContext(){
        let {add,remove,removeDone,changeState,edit,getData,getDone,getUnDone} = this;
        return {
            add,
            remove,
            removeDone,
            changeState,
            edit,
            getData,
            getDone,
            getUnDone
        };
    }
    render(){
        return (<div id={"todoApp"}>
                <Switch>
                    <Route path={"/"} exact component={ListPage}/>
                    <Route path={"/add"} component={Add}/>
                    <Route path={"/done"} component={ListPage} />
                    <Route path={"/undone"} component={ListPage}/>
                </Switch>
        </div>);
    }
}
App.childContextTypes = {
    add: PropTypes.func,
    remove: PropTypes.func,
    removeDone: PropTypes.func,
    changeState: PropTypes.func,
    edit: PropTypes.func,
    getData: PropTypes.func,
    getDone: PropTypes.func,
    getUnDone: PropTypes.func
}
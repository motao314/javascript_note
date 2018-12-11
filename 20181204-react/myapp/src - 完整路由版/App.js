import React, { Component } from 'react';
import {Redirect,Route,Switch} from "react-router-dom";
import RouterComponent from "./router/router-component";
import router from "./router/router";
class App extends Component {
  state = {
      data:[
       
      ]
  }
  /* 数据操作方法 */
  // 添加数据
  addData = (val)=>{
    let {data} = this.state;
    data.unshift({
      id: Date.now(),
      val,
      done: false
    });
    this.setState({
      data
    });
  }
  // 获取所有数据
  getData=()=>{
    let {data} = this.state;
    return data;
  }
  // 获取已完成数据
  getDoneData=()=>{
    let {data} = this.state; 
    return data.filter(item=>item.done);
  }
  // 获取未完成数据
  getUnDoneData=()=>{
    let {data} = this.state; 
    return data.filter(item=>!item.done);
  }
  // 删除数据
  remove = (id)=>{
      let {data} = this.state; 
      data = data.filter(item=>item.id!=id);
      this.setState({
        data
      });
  }
  // 删除已完成数据
  removeDone = ()=>{
    let {data} = this.state; 
    data = data.filter(item=>!item.done);
    this.setState({
      data
    });
  }
  // 修改完成状态
  changeState = (id,state)=>{
    let {data} = this.state; 
    data.forEach(item=>{
      if(item.id == id){
        item.done = state;
      }
    })
    this.setState({
      data
    });
  }

  // 编辑内容
  edit = (id,val)=>{
    let {data} = this.state; 
    data.forEach(item=>{
      if(item.id == id){
        item.val = val;
      }
    })
    this.setState({
      data
    });
  }
  render() {
    let {data} = this.state;
    let doneData = this.getDoneData();
    let unDoneData = this.getUnDoneData();
    return (<div id="todoApp">
        <Switch>
          {router.map((item,index)=>{
              return (<Route 
                    key={index} 
                    path={item.path}
                    exact = {item.exact}
                    render = {(props)=>{
                      let url = props.match.path;
                      if(url == "/"
                      && data.length == 0){
                        //如果当前在首页，没有数据就去添加数据
                          return <Redirect to={"/add"}/>
                      } else if(url == "/done"
                      && doneData.length == 0){
                          return <Redirect to={"/"}/>
                      } else if(url == "/undone"
                          && unDoneData.length == 0){
                          return <Redirect to={"/"}/>
                      }
                      let prop = Object.assign({
                        data,
                        doneData,
                        unDoneData,
                        changeState: this.changeState,
                        remove: this.remove,
                        removeDone: this.removeDone,
                        edit: this.edit,
                        addData: this.addData
                      },props);
                      return RouterComponent[index](prop);
                    }}
                />);
          })}
        </Switch>
    </div>);
  }
}
export default App;

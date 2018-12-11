import React,{Component} from "react";
import HTTP from "../http";
import HTTP_KUGOU from "../http-kugou";
import Axios from "axios";
export default class Login extends Component{
    state={
        username:"tww",
        password:"123456",
        verify:"",
        verifysrc: "/miaov/user/verify?"+Date.now()
    }
    login(){
        let {username,password,verify} = this.state;
        HTTP.post(
            "/user/login",
            {
                username,
                password,
                verify
            }
        ).then((res)=>{
            let {data} = res;
           alert("code:"+data.code+"msg:"+data.message);
        })
    }
    getKuGou(){
        HTTP_KUGOU.get("/",{
            params:{
                "json":true
            }
        }).then((res)=>{
            console.log(res);
        });
    }
    render(){
        let {username,password,verify,verifysrc} = this.state;
        return (<div>
            <h1>登录</h1>
            <input
                type="text" 
                placeholder="username" 
                value={username}
                onChange = {(e)=>{
                    this.setState({
                        username: e.target.value
                    });
                }}
            />
            <input 
                type="text" 
                placeholder="password" 
                value={password}
                onChange = {(e)=>{
                    this.setState({
                        password: e.target.value
                    });
                }}
            />
            <input 
                type="text" 
                placeholder="verify" 
                value={verify}
                onChange = {(e)=>{
                    this.setState({
                        verify: e.target.value
                    });
                }}
            />
            <img 
                src={verifysrc} 
                onClick = {()=>{
                    this.setState({
                        verifysrc:"/miaov/user/verify?"+Date.now()
                    });
                }}

            />
            <button
                onClick={()=>{
                    this.login();
                }}
            >登录</button>
             <button
                onClick={()=>{
                    this.getKuGou();
                }}
            >请求酷狗</button>
        </div>);
    }
}
import React,{Component} from 'react';
import Ul from "./ul";
export default class List extends Component {
    render(){
        let {data,isShow,changeShow,index} = this.props;
        return (
            <div>
                <h2 
                    className="title"
                    onClick = {()=>{
                        changeShow(index) 
                    }}
                >{data.name}</h2>
                {isShow?<Ul data={data.list} />:""}
            </div>
        );
    }
}
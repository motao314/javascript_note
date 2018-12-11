import React,{Component} from "react";
import Li from "./li";
export default class List extends Component {
    render(){
        let {data} = this.props;
        return(
            <ul className="list" >
                {data.map((item)=>{
                     return <Li 
                        key={item.id} 
                        {...this.props}
                        data={item} 
                    />   
                })}
            </ul>
        );
    }
}
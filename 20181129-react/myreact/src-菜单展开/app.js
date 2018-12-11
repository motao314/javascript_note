import React,{Component} from "react";
import ListItem from  "./List";
export default class App extends Component {
    state = {
        isShow:[true,false,false]
    }
    changeShow = (index)=>{
        let {isShow} = this.state;
        let nowState = isShow[index];
        isShow = isShow.map(()=>false);
        isShow[index] = !nowState;
        this.setState({
            isShow
        });
    }
    render(){
        let {data} = this.props;
        let {isShow} = this.state;
        data = Object.values(data);
        return (<div className="panel">
            {data.map((item,index)=>{
                    return (<ListItem
                        key={index}
                        data={item}
                        isShow = {isShow[index]}
                        changeShow = {this.changeShow}
                        index = {index}
                    />)
            })}
        </div>);
    }
}
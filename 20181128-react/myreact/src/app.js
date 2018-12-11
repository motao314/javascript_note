import React,{Component} from 'react';
import List from "./list";
class App extends Component {
    state = {
        isShow:[
            true,
            false,
            false
        ]
    }
    changeShow = (index)=>{
        let {isShow} = this.state;
        let nowState = isShow[index];
        isShow = isShow.map(()=>false);
        isShow[index] = !nowState;
        this.setState({isShow});
    }
    render(){
        let {data} = this.props;
        let {isShow} = this.state;
        return (<div className="panel">
            {Object.values(data).map((item,index)=>{
                return (
                   <List
                        key = {index}
                        data = {item}
                        isShow = {isShow[index]}
                        changeShow = {this.changeShow}
                        index = {index}
                   /> 
                );
            })}
        </div>);
    }
}
export default App;

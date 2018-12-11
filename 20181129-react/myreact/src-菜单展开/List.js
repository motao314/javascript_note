import React from "react";
import Info from  "./info";
class ListItem extends React.Component{
    componentDidMount() {
        this.moveHeight();
    }
    moveHeight(){
        let {list} = this.refs;
        let {isShow} = this.props;
        list.style.height = isShow?list.scrollHeight + "px":0;
    }
    componentDidUpdate() {
        this.moveHeight();
    }
    render(){
        let {data,changeShow,index} = this.props;
        return (
            <div>
                <h2
                    className="title"
                    onClick={()=>{
                        changeShow(index);
                    }}
                >{data.name}</h2>
                <div className="list" ref="list">
                    <Info data={data.list} />
                </div>
            </div>
        );
    }
}
export default ListItem;

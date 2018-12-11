import React,{Component} from "react";
import Item from "./item";
export default class App extends Component {
    state = {
        data:[
            {
                id: 0,
                name: "玉溪",
                price: 23,
                sum: 0,
                checked: false
            },{
                id: 1,
                name: "南京95至尊",
                price: 95,
                sum: 0,
                checked: false
            },{
                id: 3,
                name: "白沙和天下",
                price: 100,
                sum: 0,
                checked: false
            },{
                id: 4,
                name: "黄金叶大天叶",
                price: 80,
                sum: 0,
                checked: false
            }
        ]
    }
    changeChecked=(id,checked)=>{
        let {data} = this.state;
        data.forEach((item)=>{
            if(item.id == id){
                item.checked = checked;
            }
        })
        this.setState(data);
    }
    changeSum=(id,sum)=>{
        let {data} = this.state;
        data.forEach((item)=>{
            if(item.id == id){
                item.sum = sum;
            }
        })
        this.setState(data);
    }
    setChecked=(checked)=>{
        let {data} = this.state;
        data.forEach((item)=>{
            item.checked = checked;
        })
        this.setState(data);
    }
    getSum(){
        let {data} = this.state;
        let sum = 0;
        data.forEach((item)=>{
            if(item.checked){
                sum += item.sum*item.price;
            }
        })
        return sum;
    }
    render(){
        let {data} = this.state;
        let isAllChecked = data.every(Item=>Item.checked);
        return (
            <table id="table">
                <thead>
                    <tr>
                        <th>
                            <input
                                   type="checkbox"
                                   checked={isAllChecked}
                                   onChange={(e)=>{
                                       this.setChecked(e.target.checked);
                                   }}
                            />
                        </th>
                        <th>商品</th>
                        <th>单价</th>
                        <th>数量</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        data.map((item)=>{
                            return (<Item
                                    key={item.id}
                                    data={item}
                                    changeChecked = {this.changeChecked}
                                    changeSum = {this.changeSum}
                            />)
                        })
                    }
                </tbody>
                <tfoot>
                    <tr><th colSpan="4">总计：{this.getSum()}元</th></tr>
                </tfoot>
            </table>
        )
    }
}
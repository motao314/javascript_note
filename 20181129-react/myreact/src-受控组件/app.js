import React,{Component} from "react";
// export default class App extends Component {
//     state = {
//         val: "天气不错"
//     }
//     render(){
//         let {val} = this.state;
//         return (
//             <div>
//                 <input
//                     type="text"
//                     value={val}
//                     onChange={(e)=>{
//                         this.setState({
//                             val:e.target.value
//                         })
//                     }}
//                 />
//                 <p>{val}</p>
//             </div>
//         )
//     }
// }
export default class App extends Component {
    state = {
        val: "请输入。。"
    }
    render(){
        let {val} = this.state;
        return (
            <div>
                <input
                    type="text"
                    defaultValue={val}
                />
                <p>{val}</p>
            </div>
        )
    }
}
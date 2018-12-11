import React from "react";
function Info(props) {
    let {data} = props;
    return (<ul>
        {data.map((item,index)=>{
            return (<li key={index}>
                <p className={item.vip?"vip":""}>{item.username}</p>
                <p className="message">{item.message}</p>
            </li>);
        })}
    </ul>);
}
export default Info;
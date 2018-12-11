import React from "react";
function Item(props) {
    let {data,changeChecked,changeSum} = props;
   return (
       <tr className={data.checked?"active":""}>
            <th>
                <input
                    type="checkbox"
                    checked={data.checked}
                    onChange={(e)=>{
                        //console.log(e.target.checked);
                        changeChecked(data.id,e.target.checked);
                    }}
                />
            </th>
            <th>{data.name}</th>
            <th>{data.price}</th>
            <th>
                <input
                    type="number"
                    min="0"
                    value={data.sum}
                    onChange={(e)=>{
                        changeSum(data.id,e.target.value);
                    }}
                />
            </th>
       </tr>
   );
}
export default Item;

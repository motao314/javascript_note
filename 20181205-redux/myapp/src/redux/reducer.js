import {combineReducers} from "redux";
let todoData =  localStorage.getItem("todo");
todoData = todoData?JSON.parse(todoData):[];
function todo(todo=todoData,action) {
    switch (action.type) {
        case "TODO_ADD":
            return ([{
                id: Date.now(),
                val: action.val,
                done: false
            },...todo])
        case "TODO_EDIT":
            todo = [...todo];
            todo.forEach((item)=>{
                if(item.id === action.id){
                    item.val =  action.val
                }
            })
            return todo;
        case "TODO_DONE":
            todo = [...todo];
            todo.forEach((item)=>{
                if(item.id === action.id){
                    item.done =  action.done
                }
            })
            return todo;
        case "TODO_REMOVE":
            todo = todo.filter((item)=>item.id !== action.id);
            return todo;
    }
    return [...todo];
}
let reducers = combineReducers({todo});

export default reducers;
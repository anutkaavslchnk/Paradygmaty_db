import { ToDoCollection } from "../db/models/todo.js"

export const getToDoById=async(todoId)=>{
    const todo=await ToDoCollection.findById(todoId);
    return todo;
}
export const getAllTodos=async()=>{
    const todos=await ToDoCollection.find();
    return todos;
}

export const createTodo=async(payload)=>{
    const todo=await ToDoCollection.create(payload);
    return todo;
}

export const deleteToDo=async(todoId)=>{
    const todo=await ToDoCollection.findOneAndDelete({
        _id:todoId,
    });
    return todo;
}

export const patchToDo=async(todoId,payload,options)=>{
const res=await ToDoCollection.findOneAndUpdate({_id:todoId}, payload,{
    new:true,
    ...options
});
if(!res) return null;
return res;
}
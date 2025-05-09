import createHttpError from "http-errors";
import { createTodo, deleteToDo, getAllTodos, getToDoById } from "../services/todo.js"



export const getToDoIdController=async(req,res)=>{
    const {todoId}=req.params;
    const todos=await getToDoById(todoId);
    if (!todos) {
        res.status(404).json({
            message: 'ToDo not found'
        });
        return;
      }
    
     
      res.json(todos);
}


export const getToDoController=async(req,res)=>{
    const todos=await getAllTodos();
    res.json(todos)
}

export const createToDoController=async(req,res)=>{
const todo=await createTodo(req.body);
res.status(201).json(todo)
}

export const deleteToDoController=async(req,res,next)=>{
    const {todoId}=req.params;
    const todo=await deleteToDo(todoId);
    if(!todo){
        next(createHttpError(404, 'ToDo not found'));
        return;
    }
    res.status(204).send();
}
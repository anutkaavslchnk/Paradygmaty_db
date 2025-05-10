import createHttpError from "http-errors";
import { createTodo, deleteToDo, getAllTodos, getToDoById } from "../services/todo.js"
import { checkWithProlog } from "../services/prolog.js";



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

export const createToDoController = async (req, res, next) => {
    try {
        const { todo } = req.body;

        if (!todo) {
            return res.status(400).json({ message: 'Text is required' });
        }

      
        const existingTodos = await getAllTodos();
        const existingTexts = existingTodos.map(todo => todo.todo);

        
        const prologResult = await checkWithProlog(todo, existingTexts);

        if (prologResult === 'error') {
            return res.status(400).json({ message: 'Similar task already exists (based on category)' });
        }

        
        const newTodo = await createTodo({ todo });
        res.status(201).json(newTodo);
    } catch (err) {
        next(err);
    }
};

export const deleteToDoController=async(req,res,next)=>{
    const {todoId}=req.params;
    const todo=await deleteToDo(todoId);
    if(!todo){
        next(createHttpError(404, 'ToDo not found'));
        return;
    }
    res.status(204).send();
}
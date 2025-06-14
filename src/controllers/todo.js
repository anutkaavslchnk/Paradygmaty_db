import createHttpError from "http-errors";
import { createTodo, deleteToDo, getAllTodos, getToDoById, patchToDo } from "../services/todo.js"
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
        const { todo,deadline } = req.body;

        if (!todo) {
            return res.status(400).json({ message: 'Text is required' });
        }

      
        const existingTodos = await getAllTodos();
        const existingTexts = existingTodos.map(todo => todo.todo);

        
        const prologResult = await checkWithProlog(todo, existingTexts);

        if (prologResult === 'error') {
            return res.status(400).json({ message: 'Similar task already exists (based on category)' });
        }

        
        const newTodo = await createTodo({ todo, deadline });
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


export const editToDoController = async (req, res, next) => {
  try {
    const { todoId } = req.params;
    const { todo, deadline } = req.body;


    const existingToDo = await getToDoById(todoId);
    if (!existingToDo) {
      return next(createHttpError(404, 'ToDo not found'));
    }

 
    if (todo) {
      const allTodos = await getAllTodos();

      
      const otherTodosTexts = allTodos
        .filter(t => t._id.toString() !== todoId)
        .map(t => t.todo);

      const prologResult = await checkWithProlog(todo, otherTodosTexts);

      if (prologResult === 'error') {
        return res.status(400).json({
          message: 'Similar task already exists (based on category)',
        });
      }
    }

  
    const updatedToDo = await patchToDo(todoId, { todo, deadline });

    res.json({
      status: 200,
      message: 'Successfully patched a todo!',
      data: updatedToDo,
    });
  } catch (error) {
    next(error);
  }
};

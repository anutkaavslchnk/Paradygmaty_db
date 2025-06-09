import { Router } from "express";

import { createToDoController, deleteToDoController, editToDoController, getToDoController, getToDoIdController } from "../controllers/todo.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const router=Router();

router.get('/todos', ctrlWrapper(getToDoController));
router.get('/todos/:todoId', ctrlWrapper(getToDoIdController));
router.post('/todos', ctrlWrapper(createToDoController));
router.delete('/todos/:todoId', ctrlWrapper(deleteToDoController));
router.patch('/todos/:todoId', ctrlWrapper(editToDoController));
export default router;
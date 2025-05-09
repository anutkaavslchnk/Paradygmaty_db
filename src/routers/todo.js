import { Router } from "express";

import { createToDoController, deleteToDoController, getToDoController, getToDoIdController } from "../controllers/todo.js";
import { ctrlWrapper } from "../utils/ctrlWrapper.js";

const router=Router();

router.get('/todos', ctrlWrapper(getToDoController));
router.get('/todos/:todoId', ctrlWrapper(getToDoIdController));
router.post('/todos', ctrlWrapper(createToDoController));
router.delete('/todos/:todoId', ctrlWrapper(deleteToDoController));
export default router;
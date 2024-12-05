import {Router} from 'express';
import { requiredAuth } from '../middlewares/validateToken.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { createTaskSchema } from '../schemas/task.schema.js';
import { 
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask,
    getUserTasks
} from '../controllers/tasks.controller.js';

const router = Router();

router.get('/tasks', requiredAuth, getTasks);
router.get('/tasks/user', requiredAuth, getUserTasks);
router.get('/tasks/:id', requiredAuth, getTask);
router.post('/tasks', requiredAuth, validateSchema(createTaskSchema), createTask);
router.delete('/tasks/:id', requiredAuth, deleteTask);
router.put('/tasks/:id', requiredAuth, updateTask);

export default router;
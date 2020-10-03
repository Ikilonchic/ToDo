import { Router } from 'express';
import tasksController from '../controllers/Tasks.controller';

const router = Router();

// Tasks routes...

router.get('/', tasksController.getTasks);

router.post('/', tasksController.createTask);

router.put('/:p_id-:t_id', tasksController.updateTask);

router.delete('/:p_id-:t_id', tasksController.deleteTask);

export default router;
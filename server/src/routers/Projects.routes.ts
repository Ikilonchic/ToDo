import { Router } from 'express';

import projectsController from '../controllers/Projects.controller';
import tasksController from '../controllers/Tasks.controller';

const router = Router();


// Projects routes...


// GET    **/api/projects
router.get('/', projectsController.getProjects);

// POST   **/api/projects
router.post('/', projectsController.createProject);

// PUT    **/api/projects/p_id
router.put('/:p_id', projectsController.updateProject);

// DELETE **/api/projects/p_id
router.delete('/:p_id', projectsController.deleteProject);


// Tasks routes...


// GET    **/api/projects/p_id/tasks
router.get('/:p_id/tasks', tasksController.getTasks);

// POST   **/api/projects/p_id/tasks
router.post('/:p_id/tasks', tasksController.createTask);

// PUT    **/api/projects/p_id/tasks/t_id
router.put('/:p_id/tasks/:t_id', tasksController.updateTask);

// DELETE **/api/projects/p_id/tasks/t_id
router.delete('/:p_id/tasks/:t_id', tasksController.deleteTask);

export default router;
import { Router } from 'express';
import projectsController from '../controllers/Projects.controller';

const router = Router();

// Projects routes...

router.get('/', projectsController.getProjects);

router.post('/', projectsController.createProject);

router.put('/:p_id', projectsController.updateProject);

router.delete('/:p_id', projectsController.deleteProject);

export default router;
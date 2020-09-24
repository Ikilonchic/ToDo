import { Router, Request, Response } from 'express';
import { getRepository } from 'typeorm';

import { Project } from '../models/project';

const router = Router();

// Project routes...

router.get('/', async (req: Request, res: Response) => {
  let projects = getRepository(Project).find({
    where: { userID: req.cookies.userID }
  });

  res.end(JSON.stringify(projects));
});

// router.post('/:p_id', async (req: Request, res: Response) => {

// });

// router.put('/:p_id', async (req: Request, res: Response) => {

// });

// router.delete('/:p_id', async (req: Request, res: Response) => {

// });

export default router;
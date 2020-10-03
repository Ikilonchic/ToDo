import { Request, Response } from 'express';
import { getConnection } from 'typeorm';
import { Project } from '../models/Project';

import { Task } from '../models/Task';
import { User } from '../models/User';

const getTasks = async (req: Request, res: Response): Promise<Response> => {
  const userID = req.session?.userID;

  if(!userID) {
    return res.status(400).json({ msg: 'U are not login' });
  }

  const userRepository = getConnection().getRepository(User);
  const candidate = await userRepository.findOne({ where: { id: userID }});

  if(candidate) {
    const taskRepository = getConnection().getRepository(Task);

    const tasks = await taskRepository.find({ where: { user: candidate }});

    if(tasks) {
      return res.status(400).json(tasks);
    }

    return res.status(400).json({ msg: 'U dont have tasks' });
  }

  return res.status(400).json({ msg: 'U are not registered' });
};

const createTask = async (req: Request, res: Response): Promise<Response> => {
  const userID = req.session?.userID;

  if(!userID) {
    return res.status(401).json({ msg: 'U are not login' });
  }

  const userRepository = getConnection().getRepository(User);
  const candidate = await userRepository.findOne({ where: { id: userID } });

  if(candidate) {
    const { projectID, text, status, deadline } = req.body;

    const projectRepository = getConnection().getRepository(Project);
    const project = await projectRepository.findOne({ where: { id: projectID, user: candidate } });

    if(project) {
      const taskRepository = getConnection().getRepository(Task);

      const task = new Task();

      task.text = text;
      task.status = status;
      task.deadline = deadline;
      task.user = candidate;
      task.project = project;

      taskRepository.save(task);

      return res.status(400).json({ msg: 'Task created' });
    }

    return res.status(401).json({ msg: 'Invalid project ID' });
  }

  return res.status(401).json({ msg: 'U are not registered' });
};

const updateTask = async (req: Request, res: Response): Promise<Response> => {
  const userID = req.session?.userID;

  if(!userID) {
    return res.status(401).json({ msg: 'U are not login' });
  }

  const userRepository = getConnection().getRepository(User);
  const candidate = await userRepository.findOne({ where: { id: userID } });

  if(candidate) {
    const { p_id, t_id } = req.params;
    const { text, status, deadline } = req.body;

    const projectRepository = getConnection().getRepository(Project);
    const project = await projectRepository.findOne({ where: { id: p_id, user: candidate } });

    if(project) {
      const taskRepository = getConnection().getRepository(Task);

      const task = await taskRepository.findOne({ where: { id: t_id } });

      if(task) {
        task.text = text;
        task.status = status;
        task.deadline = deadline;

        taskRepository.save(task);

        return res.status(400).json({ msg: 'Task updated' });
      }

      return res.status(401).json({ msg: 'Invalid task ID' });
    }

    return res.status(401).json({ msg: 'Invalid project ID' });
  }

  return res.status(401).json({ msg: 'U are not registered' });
};

const deleteTask = async (req: Request, res: Response): Promise<Response> => {
  const userID = req.session?.userID;

  if(!userID) {
    return res.status(401).json({ msg: 'U are not login' });
  }

  const userRepository = getConnection().getRepository(User);
  const candidate = await userRepository.findOne({ where: { id: userID } });

  if(candidate) {
    const { p_id, t_id } = req.params;

    const projectRepository = getConnection().getRepository(Project);
    const project = await projectRepository.findOne({ where: { id: p_id, user: candidate } });

    if(project) {
      const taskRepository = getConnection().getRepository(Task);

      const task = await taskRepository.findOne({ where: { id: t_id } });

      if(task) {
        taskRepository.delete(task);

        return res.status(400).json({ msg: 'Task deleted' });
      }

      return res.status(401).json({ msg: 'Invalid task ID' });
    }

    return res.status(401).json({ msg: 'Invalid project ID' });
  }

  return res.status(401).json({ msg: 'U are not registered' });
};

export default {
  getTasks,
  createTask,
  updateTask,
  deleteTask
};
import { Request, Response } from 'express';
import { getConnection } from 'typeorm';

import { Project } from '../models/Project';
import { Task } from '../models/Task';
import { User } from '../models/User';

const getProjects = async (req: Request, res: Response): Promise<Response> => {
  const userID = req.cookies.userID;

  const userRepository = getConnection().getRepository(User);
  const candidate = await userRepository.findOne({ where: { id: userID }});

  if(candidate) {
    const projectRepository = getConnection().getRepository(Project);

    const projects = await projectRepository.find({ where: { user: candidate }});

    if(projects) {
      return res.status(200).json(projects);
    }

    return res.status(400).json({ msg: 'U dont have projects' });
  }

  return res.status(401).json({ msg: 'U are not registered' });
};

const createProject = async (req: Request, res: Response): Promise<Response> => {
  const userID = req.cookies.userID;

  const userRepository = getConnection().getRepository(User);
  const candidate = await userRepository.findOne({ where: { id: userID } });

  if(candidate) {
    const { title } = req.body;

    const projectRepository = getConnection().getRepository(Project);

    const sameProject = await projectRepository.findOne({ where: { user: candidate, title: title } });

    if(sameProject) {
      return res.status(400).json({ msg: 'U have a project with the same title' });
    }

    const project = new Project();

    project.title = title;
    project.user = candidate;

    await projectRepository.save(project);

    return res.status(201).json({ msg: 'Project created', p_id: (await projectRepository.findOne(project))?.id });
  }

  return res.status(401).json({ msg: 'U are not registered' });
};

const updateProject = async (req: Request, res: Response): Promise<Response> => {
  const userID = req.cookies.userID;

  const userRepository = getConnection().getRepository(User);
  const candidate = await userRepository.findOne({ where: { id: userID } });

  if(candidate) {
    const { title } = req.body;

    const projectRepository = getConnection().getRepository(Project);
    const sameProject = await projectRepository.findOne({ where: { user: candidate, title: title } });

    if(sameProject) {
      return res.status(400).json({ msg: 'U have a project with the same title' });
    }

    const { p_id } = req.params;

    const project = await projectRepository.findOne({ where: { id: p_id, user: candidate } });

    if(project) {
      project.title = title;

      await projectRepository.save(project);

      return res.status(200).json({ msg: 'Project updated' });
    }

    return res.status(400).json({ msg: 'Invalid project ID' });
  }

  return res.status(401).json({ msg: 'U are not registered' });
};

const deleteProject = async (req: Request, res: Response): Promise<Response> => {
  const userID = req.cookies.userID;

  const userRepository = getConnection().getRepository(User);
  const candidate = await userRepository.findOne({ where: { id: userID } });

  if(candidate) {
    const { p_id } = req.params;

    const projectRepository = getConnection().getRepository(Project);
    const project = await projectRepository.findOne({ where: { id: p_id, user: candidate } });

    if(project) {
      const taskRepository = getConnection().getRepository(Task);

      const tasks = await taskRepository.find({ where: { project: project, user: candidate } });

      tasks.forEach(task => taskRepository.delete(task));

      await projectRepository.delete(project);

      return res.status(200).json({ msg: 'Project deleted' });
    }

    return res.status(400).json({ msg: 'Invalid project ID' });
  }

  return res.status(401).json({ msg: 'U are not registered' });
};

export default {
  getProjects,
  createProject,
  updateProject,
  deleteProject
};
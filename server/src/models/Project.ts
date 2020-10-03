import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne, OneToMany
} from 'typeorm';

import { User } from './User';
import { Task } from './Task';

@Entity({ name: 'projects' })
export class Project {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'title', type: 'text', nullable: false })
  title: string

  @ManyToOne(_ => User, user => user.projects)
  user: User

  @OneToMany(_ => Task, task => task.project)
  tasks: Task[]
}
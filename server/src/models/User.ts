import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from 'typeorm';

import { Project } from './Project';
import { Task } from './Task';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'email', type: 'text', nullable: false })
  email: string

  @Column({ name: 'password', type: 'text', nullable: false })
  password: string

  @OneToMany(_ => Project, project => project.user)
  projects: Project[]

  @OneToMany(_ => Task, task => task.user)
  tasks: Task[]
}
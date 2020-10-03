import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn
} from 'typeorm';

import { Project } from './Project';
import { User } from './User';

@Entity({ name: 'tasks' })
export class Task {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ name: 'text', type: 'text', nullable: false })
  text: string

  @Column({ name: 'status', type: 'text', nullable: false })
  status: string

  @CreateDateColumn({ name: 'deadline', type: 'date', nullable: false })
  deadline: Date

  @ManyToOne(_ => User, user => user.projects)
  user: User

  @ManyToOne(_ => Project, project => project.tasks)
  project: Project
}
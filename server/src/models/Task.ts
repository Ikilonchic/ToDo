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

  @Column({ name: 'status', type: 'bool', nullable: false })
  status: boolean

  @Column({ name: 'priority', type: 'int', nullable: false })
  priority: number

  @CreateDateColumn({ name: 'deadline', type: 'date', nullable: false })
  deadline: Date

  @ManyToOne(_ => User, user => user.projects)
  user: User

  @ManyToOne(_ => Project, project => project.tasks)
  project: Project
}
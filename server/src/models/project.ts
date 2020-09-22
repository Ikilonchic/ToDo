import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne, OneToMany
} from 'typeorm';

import { User } from './user';
import { Task } from './task';

@Entity()
export class Project {
  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  title: string

  @ManyToOne(type => User, user => user.projects)
  user: User

  @OneToMany(type => Task, task => task.project)
  tasks: Task[]
}
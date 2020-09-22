import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne
} from 'typeorm';

import { Project } from './project';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  text: string

  @Column('text')
  status: string

  @ManyToOne(type => Project, project => project.tasks)
  project: Project
}
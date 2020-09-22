import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany
} from 'typeorm';

import { Project } from './project';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number

  @Column('text')
  email: string

  @Column('text')
  password: string

  @OneToMany(type => Project, project => project.user)
  projects: Project[]
}
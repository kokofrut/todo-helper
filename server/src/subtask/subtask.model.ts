import {
  Column,
  Model,
  Table,
  ForeignKey,
  HasMany,
} from 'sequelize-typescript';
import { Todo } from '../todo/todo.model';

@Table
export class SubTask extends Model<SubTask> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column
  text: string;
  
  @Column
  isCompleted: boolean

  @ForeignKey(() => Todo)
  @Column
  todoId: number;
}

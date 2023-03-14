import {
  Column,
  Model,
  Table,
  ForeignKey,
  HasMany,
} from 'sequelize-typescript';
import { User } from '../user/user.model';
import { Todo } from '../todo/todo.model';

@Table
export class Group extends Model<Group> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column
  name: string;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @HasMany(() => Todo)
  todos: Todo[];
}

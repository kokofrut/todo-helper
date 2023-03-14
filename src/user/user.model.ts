import { Column, Model, Table, HasMany } from 'sequelize-typescript';
import { Todo } from '../todo/todo.model';

@Table
export class User extends Model<User> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column
  username: string;

  @Column
  password: string;

  @HasMany(() => Todo)
  todos: Todo[];
}

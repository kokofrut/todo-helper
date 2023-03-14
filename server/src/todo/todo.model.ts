import {
  Column,
  Model,
  Table,
  ForeignKey,
  DataType,
  HasMany
} from 'sequelize-typescript';
import { User } from '../user/user.model';
import { Group } from '../group/group.model';
import { SubTask } from '../subtask/subtask.model';

@Table
export class Todo extends Model<Todo> {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column
  text: string;

  @Column
  isCompleted: boolean;

  @ForeignKey(() => User)
  @Column
  userId: number;

  @ForeignKey(() => Group)
  @Column
  groupId: number;

  @HasMany(() => SubTask)
  subTasks: SubTask[];
}

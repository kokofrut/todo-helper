import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { SubTask } from './subtask.model';
import { SubTaskService } from './subtask.service';
import { SubTaskController } from './subtask.controller';
import { User } from '../user/user.model';
import { Todo } from '../todo/todo.model';
import { TodoService } from '../todo/todo.service';

@Module({
  imports: [SequelizeModule.forFeature([SubTask, User, Todo])],
  providers: [SubTaskService, TodoService],
  controllers: [SubTaskController],
  exports: [SubTaskService],
})
export class SubTaskModule {}

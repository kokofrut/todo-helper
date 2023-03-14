import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { Group } from './group.model';
import { GroupService } from './group.service';
import { GroupController } from './group.controller';
import { User } from '../user/user.model';
import { Todo } from '../todo/todo.model';
import { TodoService } from '../todo/todo.service';

@Module({
  imports: [SequelizeModule.forFeature([Group, User, Todo])],
  providers: [GroupService, TodoService],
  controllers: [GroupController],
  exports: [GroupService],
})
export class GroupModule {}

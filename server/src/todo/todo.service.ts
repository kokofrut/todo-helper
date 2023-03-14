import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Todo } from './todo.model';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { where } from 'sequelize';

@Injectable()
export class TodoService {
  constructor(
    @InjectModel(Todo)
    private readonly todoModel: typeof Todo,
  ) {}

  async findAll(): Promise<Todo[]> {
    return this.todoModel.findAll();
  }

  async findOne(id: number): Promise<Todo> {
    return this.todoModel.findByPk(id);
  }
  async findAllByGroup(groupId: number): Promise<Todo[]> {
    return this.todoModel.findAll({
      where: {
        groupId,
      },
    });
  }
  async findAllUserTodos(userId: number): Promise<Todo[]> {
    return this.todoModel.findAll({
      where: {
        userId,
      },
    });
  }
  async create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const todo = new Todo();
    todo.text = createTodoDto.text;
    todo.isCompleted = createTodoDto.isCompleted;
    todo.userId = createTodoDto.userId;
    todo.groupId = createTodoDto.groupId;
    return todo.save();
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<void> {
    const todo = await this.todoModel.findByPk(id);
    todo.text =
      updateTodoDto.text !== undefined ? updateTodoDto.text : todo.text;
    todo.isCompleted =
      updateTodoDto.isCompleted !== undefined
        ? updateTodoDto.isCompleted
        : todo.isCompleted;
    if (updateTodoDto.userId !== undefined) {
      todo.userId = updateTodoDto.userId;
    }
    if (updateTodoDto.groupId !== undefined) {
      todo.groupId = updateTodoDto.groupId;
    }
    await todo.save();
  }

  async delete(id: number): Promise<void> {
    const todo = await this.todoModel.findByPk(id);
    await todo.destroy();
  }
}

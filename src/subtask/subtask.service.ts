import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { SubTask } from './subtask.model';
import { CreateSubTaskDto } from './dto/create-subtask.dto';
import { UpdateSubTaskDto } from './dto/update-subtask.dto';

@Injectable()
export class SubTaskService {
  constructor(
    @InjectModel(SubTask)
    private subtaskModel: typeof SubTask,
  ) { }

  async create(createSubTaskDto: CreateSubTaskDto): Promise<SubTask> {
    return this.subtaskModel.create(createSubTaskDto);
  }

  async findAll(todoId?: number): Promise<SubTask[]> {
    let subtasks = await this.subtaskModel.findAll();
    if(todoId) {
      subtasks = subtasks.filter(subtask => subtask.todoId === todoId);
    }
    return subtasks
  }

  async findOne(id: number): Promise<SubTask> {
    return this.subtaskModel.findByPk(id);
  }

  async update(id: number, updateSubTaskDto: UpdateSubTaskDto): Promise<SubTask> {
    await this.subtaskModel.update(updateSubTaskDto, {
      where: {
        id,
      },
    });
    const updatedSubTask = await this.subtaskModel.findByPk(id);
    if (!updatedSubTask) {
      throw new NotFoundException(`SubTask with ID "${id}" not found.`);
    }
    return updatedSubTask;
  }

  async remove(id: number): Promise<null> {
    const subtask = await this.findOne(id);
    await subtask.destroy();
    return null;
  }
}

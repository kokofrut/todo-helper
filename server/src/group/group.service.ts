import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Group } from './group.model';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';

@Injectable()
export class GroupService {
  constructor(
    @InjectModel(Group)
    private groupModel: typeof Group,
  ) {}

  async create(createGroupDto: CreateGroupDto): Promise<Group> {
    return this.groupModel.create(createGroupDto);
  }

  async findAll(): Promise<Group[]> {
    return this.groupModel.findAll();
  }

  async findOne(id: number): Promise<Group> {
    return this.groupModel.findByPk(id);
  }

  async update(id: number, updateGroupDto: UpdateGroupDto): Promise<Group> {
    await this.groupModel.update(updateGroupDto, {
      where: {
        id,
      },
    });
    const updatedGroup = await this.groupModel.findByPk(id);
    if (!updatedGroup) {
      throw new NotFoundException(`Group with ID "${id}" not found.`);
    }
    return updatedGroup;
  }

  async remove(id: number): Promise<null> {
    const group = await this.findOne(id);
    await group.destroy();
    return null;
  }
}

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User)
    private userModel: typeof User,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = await this.userModel.create(createUserDto);
    return user;
  }
  async findByUsername(username: string): Promise<User> {
    return this.userModel.findOne({ where: { username } });
  }

  findAll() {
    return this.userModel.findAll();
  }

  async findById(id: number): Promise<User> {
    return this.userModel.findByPk(id);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userModel.findByPk(id);

    if (user) {
      await user.update(updateUserDto);
      return user;
    }

    return null;
  }

  async remove(id: number): Promise<void> {
    const user = await this.userModel.findByPk(id);

    if (user) {
      await user.destroy();
    }
  }
}

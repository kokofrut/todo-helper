import {
  Body,
  Catch,
  Controller,
  Delete,
  Get,
  HttpException,
  Param,
  Post,
  Put,
  Query,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateSubTaskDto } from './dto/create-subtask.dto';
import { UpdateSubTaskDto } from './dto/update-subtask.dto';
import { SubTask } from './subtask.model';
import { SubTaskService } from './subtask.service';

@Controller('subtasks')
@ApiTags('subtasks')
@Catch(HttpException)
export class SubTaskController {
  constructor(private readonly subtaskService: SubTaskService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiCreatedResponse({
    description: 'The subtask has been successfully created.',
  })
  @ApiBadRequestResponse({ description: 'Invalid request data' })
  async create(@Body() createSubTaskDto: CreateSubTaskDto): Promise<SubTask> {
    return this.subtaskService.create(createSubTaskDto);
  }

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ description: 'Returns a list of subtasks' })
  async findAll(): Promise<SubTask[]> {
    return this.subtaskService.findAll();
  }

  @Get('/todo/:id')
  @UseGuards(AuthGuard('jwt'))
  @ApiOkResponse({ description: 'Returns a list of subtasks of todo' })
  @ApiNotFoundResponse({ description: 'SubTasks not found' })
  async findAllById(@Param('id') id: string): Promise<SubTask[]> {
    return this.subtaskService.findAll(Number(id));
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiNotFoundResponse({ description: 'SubTask not found' })
  async findOne(@Param('id') id: string): Promise<SubTask> {
    return this.subtaskService.findOne(Number(id));
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiNotFoundResponse({ description: 'SubTask not found' })
  async update(
    @Param('id') id: string,
    @Body() updateSubTaskDto: UpdateSubTaskDto,
  ): Promise<SubTask> {
    const updatedSubTask = await this.subtaskService.update(
      Number(id),
      updateSubTaskDto,
    );
    return updatedSubTask;
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiNotFoundResponse({ description: 'SubTask not found' })
  async remove(@Param('id') id: string): Promise<null> {
    return await this.subtaskService.remove(Number(id));
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  HttpException,
  Catch,
} from '@nestjs/common';
import {
  ApiTags,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { TodoService } from './todo.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './todo.model';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('todos')
@ApiBearerAuth()
@Controller('todos')
@Catch(HttpException)
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Get()
  @UseGuards(AuthGuard('jwt'))
  @ApiResponse({ status: 200, description: 'Returns all todos.' })
  async findAll(): Promise<Todo[]> {
    return this.todoService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id', type: Number, description: 'Id of the todo' })
  @ApiResponse({ status: 200, description: 'Returns a single todo by id.' })
  async findOne(@Param('id') id: string): Promise<Todo> {
    return this.todoService.findOne(Number(id));
  }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @ApiBody({ type: CreateTodoDto })
  @ApiResponse({ status: 201, description: 'Creates a new todo.', type: Todo })
  async create(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return this.todoService.create(createTodoDto);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiBody({ type: UpdateTodoDto })
  @ApiParam({ name: 'id', type: Number, description: 'Id of the todo' })
  @ApiResponse({ status: 204, description: 'Updates a todo by id.' })
  async update(
    @Param('id') id: number,
    @Body() updateTodoDto: UpdateTodoDto,
  ): Promise<void> {
    await this.todoService.update(id, updateTodoDto);
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id', type: Number, description: 'Id of the todo' })
  @ApiResponse({ status: 204, description: 'Deletes a todo by id.' })
  async delete(@Param('id') id: string): Promise<void> {
    await this.todoService.delete(Number(id));
  }
  @Get(':id/todos')
  @UseGuards(AuthGuard('jwt'))
  @ApiParam({ name: 'id', type: Number, description: 'Id of the user' })
  @ApiResponse({
    status: 200,
    description: 'Returns all todos of a user by userId.',
  })
  async findAllUserTodos(@Param('id') id: string): Promise<Todo[]> {
    return this.todoService.findAllUserTodos(Number(id));
  }
}

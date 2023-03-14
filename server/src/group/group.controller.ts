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
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateGroupDto } from './dto/create-group.dto';
import { UpdateGroupDto } from './dto/update-group.dto';
import { Group } from './group.model';
import { GroupService } from './group.service';

@Controller('groups')
@ApiTags('groups')
@Catch(HttpException)
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post()
  @ApiCreatedResponse({
    description: 'The group has been successfully created.',
  })
  @ApiBadRequestResponse({ description: 'Invalid request data' })
  async create(@Body() createGroupDto: CreateGroupDto): Promise<Group> {
    return this.groupService.create(createGroupDto);
  }

  @Get()
  @ApiOkResponse({ description: 'Returns a list of groups' })
  async findAll(): Promise<Group[]> {
    return this.groupService.findAll();
  }

  @Get(':id')
  @ApiNotFoundResponse({ description: 'Group not found' })
  async findOne(@Param('id') id: string): Promise<Group> {
    return this.groupService.findOne(Number(id));
  }

  @Put(':id')
  @ApiNotFoundResponse({ description: 'Group not found' })
  async update(
    @Param('id') id: string,
    @Body() updateGroupDto: UpdateGroupDto,
  ): Promise<Group> {
    const updatedGroup = await this.groupService.update(
      Number(id),
      updateGroupDto,
    );
    return updatedGroup;
  }

  @Delete(':id')
  @ApiNotFoundResponse({ description: 'Group not found' })
  async remove(@Param('id') id: string): Promise<null> {
    return await this.groupService.remove(Number(id));
  }
}

// create tests for subtask controller
import { Test, TestingModule } from '@nestjs/testing';
import { SubTaskController } from './subtask.controller';
import { SubTaskService } from './subtask.service';
import { SubTask } from './subtask.model';
import { UpdateSubTaskDto } from './dto/update-subtask.dto';

describe('SubTaskController', () => {
  let controller: SubTaskController;
  let service: SubTaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubTaskController],
      providers: [
        {
          provide: SubTaskService,
          useValue: {
            findAll: jest
              .fn()
              .mockResolvedValue([
                {
                  id: 1,
                  text: 'test',
                  isCompleted: false,
                  todoId: 1,
                },
              ]),
            findOne: jest
              .fn()
              .mockResolvedValue({
                id: 1,
                text: 'test',
                isCompleted: false,
                todoId: 1,
              }),
            create: jest
              .fn()
              .mockResolvedValue({
                id: 1,
                text: 'test',
                isCompleted: false,
                todoId: 1,

              }),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<SubTaskController>(SubTaskController);
    service = module.get<SubTaskService>(SubTaskService);
  });

  describe('findAll', () => {
    it('should return an array of subtasks', async () => {
      const expectedResult = [
        { id: 1, text: 'test', isCompleted: false, todoId: 1},
      ] as SubTask[];

      jest.spyOn(service, 'findAll').mockResolvedValue(expectedResult);

      const result = await controller.findAll();

      expect(result).toEqual(expectedResult);
    });
  });

  describe('findOne', () => {
    it('should return a single subtask with matching id', async () => {
      const expectedResult = { id: 1, text: 'subtask1' } as SubTask;
      jest.spyOn(service, 'findOne').mockResolvedValue(expectedResult);

      const result = await controller.findOne('1');
      expect(result).toEqual(expectedResult);
    });
  });

  describe('create', () => {
    it('should create a new subtask', async () => {
      const subtask = { text: 'new_subtask', todoId: 1, isCompleted: false };
      const expectedResult = { id: 1, ...subtask } as SubTask;
      jest.spyOn(service, 'create').mockResolvedValue(expectedResult);

      const result = await controller.create(subtask);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('update', () => {
    it('should update an existing subtask', async () => {
      const id = 1;
      const updateDto = { name: 'updated_subtask' } as UpdateSubTaskDto;
      jest.spyOn(service, 'update');
      const result = await controller.update(id.toString(), updateDto);
      expect(result).toEqual(undefined);
    });
  });

  describe('remove', () => {
    it('should remove an existing subtask', async () => {
      const id = 1;
      jest.spyOn(service, 'remove').mockResolvedValue(null);

      const result = await controller.remove(id.toString());
      expect(result).toBeNull();
    });
  });
});

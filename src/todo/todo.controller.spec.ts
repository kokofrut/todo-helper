import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from './todo.controller';
import { TodoService } from './todo.service';
import { Todo } from '../todo/todo.model';
import { UpdateTodoDto } from './dto/update-todo.dto';

describe('TodoController', () => {
  let controller: TodoController;
  let service: TodoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [
        {
          provide: TodoService,
          useValue: {
            // mocks TodoService
            findAll: jest
              .fn()
              .mockResolvedValue([
                {
                  id: 1,
                  text: 'test',
                  isCompleted: false,
                  userId: 1,
                  groupId: 1,
                },
              ]),
            findOne: jest
              .fn()
              .mockResolvedValue({
                id: 1,
                text: 'test',
                isCompleted: false,
                userId: 1,
                groupId: 1,
              }),
            create: jest
              .fn()
              .mockResolvedValue({
                id: 1,
                text: 'test',
                isCompleted: false,
                userId: 1,
                groupId: 1,
              }),
            update: jest.fn(),
            delete: jest.fn(),
            findAllUserTodos: jest
              .fn()
              .mockResolvedValue([
                {
                  id: 1,
                  text: 'test',
                  isCompleted: false,
                  userId: 1,
                  groupId: 1,
                },
              ]),
          },
        },
      ],
    }).compile();

    controller = module.get<TodoController>(TodoController);
    service = module.get<TodoService>(TodoService);
  });

  describe('findAll', () => {
    it('should return an array of todos', async () => {
      const expectedResult = [
        { id: 1, text: 'test', isCompleted: false, userId: 1, groupId: 1 },
      ] as Todo[];

      jest.spyOn(service, 'findAll').mockResolvedValue(expectedResult);

      const result = await controller.findAll();

      expect(result).toEqual(expectedResult);
    });
  });

  describe('findOne', () => {
    it('should return a single todo with matching id', async () => {
      // Define the expected result of the service call
      const expectedResult = {
        id: 1,
        text: 'test',
        isCompleted: false,
        userId: 1,
        groupId: 1,
      } as Todo;

      jest.spyOn(service, 'findOne').mockResolvedValue(expectedResult);

      const result = await controller.findOne('1');

      expect(result).toEqual(expectedResult);
    });
  });

  describe('create', () => {
    it('should create a new todo', async () => {
      const expectedResult = {
        id: 1,
        text: 'test',
        isCompleted: false,
        userId: 1,
        groupId: 1,
      } as Todo;

      jest.spyOn(service, 'create').mockResolvedValue(expectedResult);

      const result = await controller.create({
        text: 'test',
        isCompleted: false,
        userId: 1,
        groupId: 1,
        subTasks: []
      });

      expect(result).toEqual(expectedResult);
    });
  });
  describe('update', () => {
    it('should update a todo successfully', async () => {
      const updateSpy = jest.spyOn(service, 'update');
      const updateDto = { text: 'test', isCompleted: true } as UpdateTodoDto;
      await controller.update(1, updateDto);

      expect(updateSpy).toHaveBeenCalledWith(1, {
        isCompleted: true,
        text: 'test',
      });
      expect(updateSpy).toHaveBeenCalled();
      expect(updateSpy).toReturnWith(undefined);
    });
  });
  describe('delete', () => {
    it('should delete a todo successfully', async () => {
      const deleteSpy = jest.spyOn(service, 'delete');
      await controller.delete('1');
      expect(deleteSpy).toHaveBeenCalled();
      expect(deleteSpy).toReturnWith(undefined);
    });
  });
  describe('findAllUserTodos', () => {
    it('should return all todoes by user id', async () => {
      const expectedValue = [
        { id: 1, text: 'test', isCompleted: false, userId: 1, groupId: 1 },
      ] as Todo[];
      jest.spyOn(service, 'findAllUserTodos').mockResolvedValue(expectedValue);
      const result = await controller.findAllUserTodos('1');
      expect(result).toEqual(expectedValue);
    });
  });
});

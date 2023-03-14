import { Test, TestingModule } from '@nestjs/testing';
import { User } from './user.model';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UserController', () => {
  let service: UserService;
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            create: jest
              .fn()
              .mockResolvedValue({
                id: 1,
                username: 'John',
                password: 'fie2jkcf39oepEfkFdleorEpfF43049F',
              }),
            update: jest.fn(),
            remove: jest.fn(),
            findById: jest
              .fn()
              .mockResolvedValue({
                id: 1,
                username: 'John',
                password: 'fie2jkcf39oepEfkFdleorEpfF43049F',
              }),
            findAll: jest
              .fn()
              .mockResolvedValue([
                {
                  id: 1,
                  username: 'John',
                  password: 'fie2jkcf39oepEfkFdleorEpfF43049F',
                },
              ]),
          },
        },
      ],
    }).compile();
    controller = module.get<UserController>(UserController);
    service = module.get<UserService>(UserService);
  });
  describe('create', () => {
    it('should create a new user and return it', async () => {
      const expectedUser = {
        id: 1,
        username: 'John',
        password: 'fie2jkcf39oepEfkFdleorEpfF43049F',
      } as User;
      jest.spyOn(service, 'create').mockResolvedValue(expectedUser);
      const userDto = {
        username: 'John',
        password: 'fie2jkcf39oepEfkFdleorEpfF43049F',
      } as CreateUserDto;
      const result = await service.create(userDto);
      expect(result).toEqual(expectedUser);
    });
  });
  describe('update', () => {
    it('should update the user and return undefined', async () => {
      const updateSpy = jest.spyOn(service, 'update');
      const updateDto = { username: 'test' } as UpdateUserDto;
      const result = await service.update(1, updateDto);
      expect(updateSpy).toHaveBeenCalledTimes(1);
      expect(updateSpy).toHaveBeenCalledWith(1, { username: 'test' });
      expect(result).toEqual(undefined);
    });
  });
  describe('remove', () => {
    it('should remove user and return undefined', async () => {
      const removeSpy = jest.spyOn(service, 'remove');
      const result = await service.remove(1);
      expect(result).toEqual(undefined);
      expect(removeSpy).toBeCalledTimes(1);
      expect(removeSpy).toBeCalledWith(1);
    });
  });
  describe('findAll', () => {
    it('should return an array of todos', async () => {
      const expectedResult = [
        {
          id: 1,
          username: 'John',
          password: 'fie2jkcf39oepEfkFdleorEpfF43049F',
        },
      ] as User[];
      jest.spyOn(service, 'findAll').mockResolvedValue(expectedResult);
      const result = await controller.findAll();
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findOne', () => {
    it('should return a user with matching id', async () => {
      const expectedResult = {
        id: 1,
        username: 'John',
        password: 'fie2jkcf39oepEfkFdleorEpfF43049F',
      } as User;
      jest.spyOn(service, 'findById').mockResolvedValue(expectedResult);
      const result = await controller.findOne('1');
      expect(result).toEqual(expectedResult);
    });
  });
});

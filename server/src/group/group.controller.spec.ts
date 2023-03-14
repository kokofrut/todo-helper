// create tests for group controller
import { Test, TestingModule } from '@nestjs/testing';
import { GroupController } from './group.controller';
import { GroupService } from './group.service';
import { Group } from './group.model';
import { UpdateGroupDto } from './dto/update-group.dto';

describe('GroupController', () => {
  let controller: GroupController;
  let service: GroupService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupController],
      providers: [
        {
          provide: GroupService,
          useValue: {
            findAll: jest.fn().mockResolvedValue([
              { id: 1, name: 'group1' },
              { id: 2, name: 'group2' },
              { id: 3, name: 'group3' },
            ]),
            findOne: jest.fn().mockResolvedValue({ id: 1, name: 'group1' }),
            create: jest
              .fn()
              .mockImplementation((group: Group) =>
                Promise.resolve({ id: 1, ...group }),
              ),
            update: jest
              .fn()
              .mockImplementation((id: number, group: Group) =>
                Promise.resolve(undefined),
              ),
            remove: jest.fn().mockReturnValue(null),
          },
        },
      ],
    }).compile();

    controller = module.get<GroupController>(GroupController);
    service = module.get<GroupService>(GroupService);
  });

  describe('findAll', () => {
    it('should return an array of groups', async () => {
      const expectedResult = [
        { id: 1, name: 'group1' },
        { id: 2, name: 'group2' },
        { id: 3, name: 'group3' },
      ] as Group[];
      jest.spyOn(service, 'findAll').mockResolvedValue(expectedResult);

      const result = await controller.findAll();
      expect(result).toEqual(expectedResult);
    });
  });

  describe('findOne', () => {
    it('should return a single group with matching id', async () => {
      const expectedResult = { id: 1, name: 'group1' } as Group;
      jest.spyOn(service, 'findOne').mockResolvedValue(expectedResult);

      const result = await controller.findOne('1');
      expect(result).toEqual(expectedResult);
    });
  });

  describe('create', () => {
    it('should create a new group', async () => {
      const group = { name: 'new_group', userId: 1 };
      const expectedResult = { id: 1, ...group } as Group;
      jest.spyOn(service, 'create').mockResolvedValue(expectedResult);

      const result = await controller.create(group);
      expect(result).toEqual(expectedResult);
    });
  });

  describe('update', () => {
    it('should update an existing group', async () => {
      const id = 1;
      const updateDto = { name: 'updated_group' } as UpdateGroupDto;
      jest.spyOn(service, 'update');
      const result = await controller.update(id.toString(), updateDto);
      expect(result).toEqual(undefined);
    });
  });

  describe('remove', () => {
    it('should remove an existing group', async () => {
      const id = 1;
      jest.spyOn(service, 'remove').mockResolvedValue(null);

      const result = await controller.remove(id.toString());
      expect(result).toBeNull();
    });
  });
});

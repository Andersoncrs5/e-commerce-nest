import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { CryptoService } from '../../CryptoService';
import { CreateUserDto } from './dto/create-user.dto';

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<User>;

  beforeEach(async () => {
    const mockRepository = {
      findOne: jest.fn(), // Mock do método findOne
    };

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('Should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('FindOne', () => {
    it('deve lançar BadRequestException se o ID for inválido', async () => {
      await expect(service.findOne(0)).rejects.toThrow(BadRequestException);
      await expect(service.findOne(-1)).rejects.toThrow(BadRequestException);
    });

    it('deve lançar NotFoundException se o usuário não for encontrado', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });

    it('deve retornar um usuário válido se encontrado', async () => {
      // const mockUser = { id: 1, name: 'Test User' } as User;
      // jest.spyOn(repository, 'findOne').mockResolvedValue(mockUser);

      // await expect(service.findOne(1)).resolves.toEqual(mockUser);
    });
  });

});

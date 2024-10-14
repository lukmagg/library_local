import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { UsersModule } from './users.module';

describe('UsersService', () => {
    let service: UsersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [UsersModule],
        }).compile();

        service = module.get<UsersService>(UsersService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    })

    // it('should create a new user', async () => {
    //     const user = await service.create({ name: 'John Doe', email: 'john.doe@example.com' });
    //     expect(user).toHaveProperty('id');
    //     expect(user.name).toBe('John Doe');
    // });
});

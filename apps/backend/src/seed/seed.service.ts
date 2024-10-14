import { Injectable, OnModuleInit } from '@nestjs/common';
import { Area, Lend } from 'src/Constants';
import { ValidRoles } from 'src/auth/enums/valid-roles.enum';
import { BookService } from 'src/book/book.service';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { faker } from '@faker-js/faker';
import { sampleEnum, sampleIds } from 'src/utils/sample';

import { CreateBookInput } from 'src/book/dto/create-book.input';
import * as bcrypt from 'bcrypt';
import { SearchArgs } from 'src/common/dto/args';

@Injectable()
export class SeedService implements OnModuleInit {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly usersService: UsersService,
    private readonly bookService: BookService,
  ) {}

  onModuleInit() {
    this.executeSeed();
  }

  async executeSeed() {
    if (process.env.STATE === 'prod') {
      console.log('We cannot run seed on Production');
      return;
    }

    const totalBooks = await this.bookService.totalCount();
    const totalUsers = await this.usersService.totalCount();

    if (totalBooks < 4950 || totalUsers < 100) {
      await this.deleteDatabase();
      await this.loadUsers();
      await this.loadBooks();
    }

    return true;
  }

  async deleteDatabase() {
    await this.prismaService.user.deleteMany();
    await this.prismaService.book.deleteMany();
  }

  async loadUsers() {
    const users = [];
    const password = bcrypt.hashSync('123456', 10);

    // make user root@localhost.com
    users.push({
      id: faker.string.uuid(),
      email: 'root@localhost.com',
      name: 'lucas',
      password,
      roles: [ValidRoles.admin],
    });

    // make list of users
    Array.from({ length: 2000 }).forEach(() => {
      return users.push({
        id: faker.string.uuid(),
        email: faker.internet.email(),
        name: faker.internet.userName(),
        phone: faker.phone.number(),
        roles: [
          sampleEnum([
            ValidRoles.student,
            ValidRoles.teacher,
            ValidRoles.tutor,
          ]),
        ],
        password,
      });
    });

    await this.usersService.createMany(users);
  }

  async loadBooks() {
    const users = await this.usersService.findAll(
      { offset: 0, limit: 0 },
      { search: '' },
    );

    const userIds = users.map((user) => {
      return user.id;
    });

    const books: [CreateBookInput] = [null];

    Array.from({ length: 5000 }).forEach(() => {
      const lend = sampleEnum(Lend);

      const isLend = lend === Lend.PRESTADO;

      const userId = isLend ? sampleIds(userIds) : null;

      return books.push({
        title: faker.lorem.words(10),
        author: faker.person.fullName(),
        edition: faker.date.past().toString(),
        pages: faker.number.int({ min: 10, max: 2000 }),
        area: sampleEnum(Area),
        inventory: faker.number.int({ min: 1, max: 100 }),
        lend: lend,
        userId: userId,
        addedAt: faker.date.past(),
      });
    });

    books.shift();

    await this.bookService.createMany(books);
  }
}

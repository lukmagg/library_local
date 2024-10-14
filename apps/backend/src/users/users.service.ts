import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserObject } from './model/user.object';
import { PrismaService } from './../core/prisma/prisma.service';
import { ValidRoles } from './../auth/enums/valid-roles.enum';
import { UpdateUserInput } from './dto/inputs/update-user.input';
import { PaginationArgs, SearchArgs } from 'src/common/dto/args';

@Injectable()
export class UsersService {
  private logger = new Logger('UsersService');

  constructor(private readonly prismaService: PrismaService) { }

  async create(data: any, roles = [ValidRoles.teacher]): Promise<UserObject> {
    const { v4: uuidv4 } = require('uuid');

    try {
      return await this.prismaService.user.create({
        data: {
          ...data,
          password: bcrypt.hashSync(data.password, 10),
          roles,
          id: uuidv4(),
        },
      });
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  async createMany(data) {
    return await this.prismaService.user.createMany({
      data,
    });
  }

  async findAll(
    paginationArgs: PaginationArgs,
    searchArgs: SearchArgs,
  ): Promise<UserObject[]> {
    const { limit, offset } = paginationArgs;
    const { search } = searchArgs;
    return await this.prismaService.user.findMany({
      skip: offset,
      take: limit,
      orderBy: {
        id: 'asc',
      },
      where: {
        OR: [
          {
            name: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            email: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            phone: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ],
      },
    });
  }

  async findOneByEmail(email: string): Promise<UserObject> {
    try {
      return await this.prismaService.user.findFirstOrThrow({
        where: {
          email,
        },
      });
    } catch (error) {
      this.handleDBErrors({
        code: 'error-001',
        detail: `User not found`,
      });
    }
  }

  async findOneById(id: string): Promise<UserObject> {
    try {
      return await this.prismaService.user.findFirstOrThrow({
        where: {
          id,
        },
      });
    } catch (error) {
      this.handleDBErrors({
        code: 'error-001',
        detail: `${id} not found`,
      });
    }
  }

  async block(id: string, adminUser: UserObject): Promise<UserObject> {
    const userToBlock = await this.findOneById(id);
    // TODO: user.lastUpdateBy = adminUser;
    return await this.prismaService.user.update({
      where: {
        email: userToBlock.email,
      },
      data: {
        isActive: false,
      },
    });
  }

  async update(
    id: string,
    updateUserInput: UpdateUserInput,
    adminUser: UserObject,
  ): Promise<UserObject> {
    try {
      // TODO: user.lastUpdateBy = adminUser;
      return await this.prismaService.user.update({
        where: {
          id,
        },
        data: updateUserInput,
      });
    } catch (error) {
      this.handleDBErrors(error);
    }
  }

  private handleDBErrors(error: any): never {
    if (error.code === 'P2002') {
      throw new BadRequestException('Error: duplicate email');
    }

    if (error.code === 'error-001') {
      throw new BadRequestException(error.detail);
    }

    this.logger.error(error);

    throw new InternalServerErrorException('Please check server logs');
  }

  async totalCount() {
    return await this.prismaService.user.count();
  }
}

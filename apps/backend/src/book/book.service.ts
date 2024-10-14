import { Injectable, NotFoundException } from '@nestjs/common';
import { PaginationArgs, SearchArgs } from 'src/common/dto/args';
import { PrismaService } from 'src/core/prisma/prisma.service';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { Book } from './model/book.object';

@Injectable()
export class BookService {
  constructor(private readonly prismaService: PrismaService) { }

  async create(data: CreateBookInput) {
    return await this.prismaService.book.create({
      data,
    });
  }

  async createMany(data: [CreateBookInput]) {
    return await this.prismaService.book.createMany({
      data,
    });
  }

  async findAll(
    paginationArgs: PaginationArgs,
    searchArgs: SearchArgs,
  ): Promise<Book[]> {
    const { limit, offset } = paginationArgs;
    const { search } = searchArgs;
    // console.log(search);
    return await this.prismaService.book.findMany({
      skip: offset,
      take: limit,
      orderBy: {
        id: 'asc',
      },
      where: {
        OR: [
          {
            title: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            area: {
              contains: search,
              mode: 'insensitive',
            },
          },
          {
            author: {
              contains: search,
              mode: 'insensitive',
            },
          },
        ],
      },
    });
  }

  async findOneById(id: string): Promise<Book> {
    try {
      return await this.prismaService.book.findFirstOrThrow({
        where: {
          id,
        },
      });
    } catch (error) {
      throw new NotFoundException(`Book with id ${id} not found`);
    }
  }

  async update(id: string, updateBookInput: UpdateBookInput): Promise<Book> {
    await this.findOneById(id);
    try {
      return await this.prismaService.book.update({
        where: {
          id,
        },
        data: updateBookInput,
      });
    } catch (error) {
      console.log(error);
    }
  }

  async remove(id: string): Promise<Book> {
    await this.findOneById(id); // if the book not exist it throws error
    return await this.prismaService.book.delete({
      where: {
        id,
      },
    });
  }

  async totalCount() {
    return await this.prismaService.book.count();
  }
}

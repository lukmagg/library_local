import { Resolver, Query, Mutation, Args, ID } from '@nestjs/graphql';
import { BookService } from './book.service';
import { Book } from './model/book.object';
import { CreateBookInput } from './dto/create-book.input';
import { UpdateBookInput } from './dto/update-book.input';
import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { PaginationArgs, SearchArgs } from 'src/common/dto/args';
import { ValidRoles } from 'src/auth/enums/valid-roles.enum';

@Resolver(() => Book)
@UseGuards(JwtAuthGuard)
export class BookResolver {
  constructor(private readonly bookService: BookService) {}

  @Mutation(() => Book, { name: 'createBook' })
  create(@Args('createBookInput') createBookInput: CreateBookInput) {
    return this.bookService.create(createBookInput);
  }

  @Query(() => [Book], { name: 'books' })
  findAll(
    @Args() searchArgs: SearchArgs,
    @Args() paginationArgs: PaginationArgs,
  ) {
    return this.bookService.findAll(paginationArgs, searchArgs);
  }

  @Query(() => Book, { name: 'book' })
  findOne(@Args('id', { type: () => ID }, ParseUUIDPipe) id: string) {
    return this.bookService.findOneById(id);
  }

  @Query(() => Number)
  totalCount() {
    return this.bookService.totalCount();
  }

  @Mutation(() => Book, { name: 'updateBook' })
  updateBook(@Args('updateBookInput') updateBookInput: UpdateBookInput) {
    return this.bookService.update(updateBookInput.id, updateBookInput);
  }

  @Mutation(() => Book, { name: 'removeBook' })
  removeBook(@Args('id', { type: () => String }) id: string) {
    return this.bookService.remove(id);
  }
}

import { ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { Resolver, Query, Args, ID, Mutation } from '@nestjs/graphql';
// import { CurrentUser } from './../../src/auth/decorators/current-user.decorator';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator'
import { ValidRoles } from 'src/auth/enums/valid-roles.enum';
import { validRolesArgs } from './dto/args/roles.arg';
import { UserObject } from './model/user.object';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UpdateUserInput } from './dto/inputs/update-user.input';
import { PaginationArgs, SearchArgs } from 'src/common/dto/args';

@Resolver(() => UserObject)
@UseGuards(JwtAuthGuard)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) { }

  @Query(() => [UserObject], { name: 'users' })
  findAll(
    @Args() searchArgs: SearchArgs,
    @Args() paginationArgs: PaginationArgs,
  ) {
    return this.usersService.findAll(paginationArgs, searchArgs);
  }

  @Query(() => UserObject, { name: 'user' })
  async findOne(
    @Args('id', { type: () => ID }, ParseUUIDPipe) id: string,
    @CurrentUser([ValidRoles.admin, ValidRoles.teacher]) user: UserObject,
  ): Promise<UserObject> {
    return this.usersService.findOneById(id);
  }

  @Mutation(() => UserObject, { name: 'blockUser' })
  async blockUser(
    @Args('id', { type: () => ID }) id: string,
    @CurrentUser([ValidRoles.admin, ValidRoles.teacher]) user: UserObject,
  ): Promise<UserObject> {
    return this.usersService.block(id, user);
  }

  @Mutation(() => UserObject, { name: 'updateUser' })
  async updateUser(
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
    @CurrentUser([ValidRoles.admin, ValidRoles.teacher]) user: UserObject,
  ) {
    return this.usersService.update(updateUserInput.id, updateUserInput, user);
  }
}

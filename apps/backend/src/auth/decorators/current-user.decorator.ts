import {
  createParamDecorator,
  ExecutionContext,
  ForbiddenException,
  InternalServerErrorException,
} from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import { UserObject } from 'src/users/model/user.object';
import { ValidRoles } from '../enums/valid-roles.enum';

export const CurrentUser = createParamDecorator(
  (roles: ValidRoles[] = [], context: ExecutionContext) => {
    const ctx = GqlExecutionContext.create(context);
    const user: UserObject = ctx.getContext().req.user;
    if (!user) {
      throw new InternalServerErrorException(`No user inside the request`);
    }

    if (roles.length === 0) return user;

    for (const role of user.roles) {
      // TODO: Eliminar Valid Roles
      if (roles.includes(role as ValidRoles)) {
        return user;
      }
    }

    throw new ForbiddenException(
      `User ${user.name} need a valid role [${roles}]`,
    );
  },
);

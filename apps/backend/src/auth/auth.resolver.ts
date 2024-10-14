import { UseGuards } from '@nestjs/common';
import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { SigninInput } from './dto/inputs/signin.input';
import { SignupInput } from './dto/inputs/signup.input';
import { AuthResponseObject } from './model/auth-response';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { UserObject } from 'src/users/model/user.object';
import { ValidRoles } from './enums/valid-roles.enum';

@Resolver(() => AuthResolver)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => AuthResponseObject, { name: 'signup' })
  async signup(
    @Args('signupInput') signupInput: SignupInput,
  ): Promise<AuthResponseObject> {
    return await this.authService.signup(signupInput);
  }

  @Mutation(() => AuthResponseObject, { name: 'signin' })
  async signin(
    @Args('signinInput') signinInput: SigninInput,
  ): Promise<AuthResponseObject> {
    return await this.authService.signin(signinInput);
  }

  @Query(() => AuthResponseObject, { name: 'revalidate' })
  @UseGuards(JwtAuthGuard)
  async revalidateToken(
    @CurrentUser(/**[ValidRoles.admin]**/) user: UserObject,
  ): Promise<AuthResponseObject> {
    return await this.authService.revalidateToken(user);
  }
}

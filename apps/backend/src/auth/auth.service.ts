import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignupInput } from './dto/inputs/signup.input';
import { AuthResponseObject } from './model/auth-response';
import { UsersService } from '../users/users.service';
import { SigninInput } from './dto/inputs/signin.input';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserObject } from 'src/users/model/user.object';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  private async getJwtToken(user) {
    return await this.jwtService.signAsync({ id: user.id, roles: user.roles });
  }

  async signup(signupInput: SignupInput): Promise<AuthResponseObject> {
    const user = await this.usersService.create(signupInput);
    const token = await this.getJwtToken(user);
    return {
      token,
      user,
    };
  }

  async signin(signinInput: SigninInput): Promise<AuthResponseObject> {
    const user = await this.usersService.findOneByEmail(signinInput.email);

    if (!bcrypt.compareSync(signinInput.password, user.password)) {
      throw new UnauthorizedException('Email/Password do not match');
    }

    const token = await this.getJwtToken(user);

    return {
      token,
      user,
    };
  }

  async validateUser(id: string): Promise<UserObject> {
    const user = await this.usersService.findOneById(id);

    if (!user.isActive)
      throw new UnauthorizedException(`User is inactive, talk with an admin`);

    delete user.password;

    return user;
  }

  async revalidateToken(user: UserObject): Promise<AuthResponseObject> {
    const token = await this.getJwtToken(user.id);

    return { token, user };
  }
}

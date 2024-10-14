import { Module } from '@nestjs/common';
import { PrismaModule } from './../core/prisma/prisma.module';
import { UsersResolver } from './users.resolver';
import { UsersService } from './users.service';

@Module({
  providers: [UsersResolver, UsersService],
  exports: [UsersService],
  imports: [PrismaModule],
})
export class UsersModule { }

import { Module } from '@nestjs/common';

import { SeedResolver } from './seed.resolver';
import { BookModule } from 'src/book/book.module';
import { PrismaModule } from 'src/core/prisma/prisma.module';
import { UsersModule } from 'src/users/users.module';

import { SeedService } from './seed.service';

@Module({
  providers: [SeedResolver, SeedService],
  imports: [UsersModule, BookModule, PrismaModule],
})
export class SeedModule {}

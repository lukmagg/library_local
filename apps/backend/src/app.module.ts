import { Module } from '@nestjs/common';
import { CoreModule } from './core/core.module';
import { PrismaModule } from './core/prisma/prisma.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { BookModule } from './book/book.module';
import { SeedModule } from './seed/seed.module';
import { CommonModule } from './common/common.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // DynamicModule
    AuthModule,
    CoreModule,
    PrismaModule,
    UsersModule,
    BookModule,
    SeedModule,
    CommonModule,
  ],
})
export class AppModule { }

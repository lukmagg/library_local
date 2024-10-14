import { join } from 'path';
import { Logger, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UsersModule } from '../../users/users.module';
import { AuthModule } from '../../auth/auth.module';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      driver: ApolloDriver,
      imports: [AuthModule],
      inject: [JwtService],
      useFactory: async (jwtService: JwtService) => ({
        introspection: true,
        driver: ApolloDriver,
        autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
        playground: true,
        context({ req }) {
          /* const token = req.headers.authorization?.replace('Bearer ', '');
          if (!token) throw Error('Token needed');

          const payload = jwtService.decode(token);
          if (!payload) throw Error('Token not valid'); */
        },
      }),
    }),
    // TODO: configuracion basica
    /* GraphQLModule.forRoot<ApolloDriverConfig>({
      introspection: true,
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
    }), */
    UsersModule,
  ],
})
export class GraphqlModule {}

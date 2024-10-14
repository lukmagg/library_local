import { ObjectType, ID, Field, Int } from '@nestjs/graphql';
import { UserObject } from 'src/users/model/user.object';

@ObjectType()
export class Book {
  @Field(() => ID)
  id: string;

  @Field({ nullable: false })
  title: string;

  @Field({ nullable: false })
  author: string;

  @Field({ nullable: true })
  edition?: string;

  @Field(() => Int, { nullable: true })
  pages?: number;

  @Field({ nullable: true })
  area?: string;

  @Field(() => Int, { nullable: true })
  inventory?: number;

  @Field({ nullable: true })
  lend?: string;

  @Field(() => UserObject, { nullable: true })
  user?: UserObject;

  @Field({ nullable: true })
  userId?: string;

  @Field({ nullable: true })
  addedAt?: Date;
}

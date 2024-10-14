import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class UserObject {
  @Field(() => ID, { nullable: true })
  id?: string;

  @Field({ nullable: true })
  name?: string;

  @Field({ nullable: true })
  email?: string;

  @Field({ nullable: true })
  phone?: string;

  // this never need return the password
  password?: string;

  @Field(() => [String], { nullable: true })
  roles?: string[];

  @Field(() => Boolean, { nullable: true })
  isActive?: boolean;

  @Field({ nullable: true })
  createdAt?: Date;
}

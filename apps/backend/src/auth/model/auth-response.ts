import { Field, ObjectType } from '@nestjs/graphql';
import { UserObject } from 'src/users/model/user.object';

@ObjectType()
export class AuthResponseObject {
  @Field(() => String)
  token: string;
  @Field(() => UserObject)
  user: UserObject;
}

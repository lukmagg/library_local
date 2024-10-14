import { InputType, Int, Field, ID } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { Area, Lend } from 'src/Constants';

@InputType()
export class CreateBookInput {
  @Field(() => String, { nullable: false })
  @IsNotEmpty()
  title: string;

  @Field(() => String, { nullable: false })
  author: string;

  @Field(() => String, { nullable: true })
  edition?: string;

  @Field(() => Int, { nullable: true })
  pages?: number;

  @Field(() => Area, { nullable: true })
  area?: Area;

  @Field(() => Int, { nullable: true })
  inventory?: number;

  @Field(() => Lend, { nullable: true })
  lend?: Lend;

  @Field(() => ID, { nullable: true })
  userId?: string;

  @Field(() => Date, { nullable: true })
  addedAt?: Date;
}

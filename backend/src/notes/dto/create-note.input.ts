import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateNoteInput {
  @Field()
  userId: string;

  @Field({ nullable: true })
  description: string;
}

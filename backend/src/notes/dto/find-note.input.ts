import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class FindNoteInput {
  @Field()
  id: string;
}

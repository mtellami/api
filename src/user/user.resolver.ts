import { Resolver, Query } from '@nestjs/graphql';

import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  email: string;
}

@Resolver()
export class UserResolver {
  @Query(() => [User])
  getUsers() {
    return [
      { id: 1, name: 'John', email: 'john@example.com' },
      { id: 2, name: 'Alice', email: 'alice@example.com' },
    ];
  }
}

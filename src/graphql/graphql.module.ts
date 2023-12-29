import { Module } from '@nestjs/common';
import { UserResolver } from 'src/user/user.resolver';

@Module({
  providers: [UserResolver]
})
export class GraphqlModule {}

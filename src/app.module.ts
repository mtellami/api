import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { GraphqlModule } from './graphql/graphql.module';
import { UserResolver } from './user/user.resolver';

@Module({
  imports: [
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			playground: true,
			autoSchemaFile: 'src/graphql.gql',
		}),
		GraphqlModule
	],
  controllers: [AppController],
  providers: [AppService, UserResolver],
})
export class AppModule {}

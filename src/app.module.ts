import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path'
import { AppService } from './app.service';
import { AppResolver } from './app.resolver';

@Module({
  imports: [
		GraphQLModule.forRoot<ApolloDriverConfig>({
			driver: ApolloDriver,
			playground: true,
			autoSchemaFile: join(process.cwd(), 'src/graphql.gql'),
		}),
	],
  providers: [AppResolver, AppService],
})
export class AppModule {}

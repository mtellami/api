import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { ProductFound } from './product.middleware';
import { ProductService } from './product.service';

@Module({
	providers: [ProductService]
})
export class ProductModule implements NestModule  {
	configure(consumer: MiddlewareConsumer) {
	   consumer
		.apply(ProductFound)
		.forRoutes({ path: 'product/:id', method: RequestMethod.ALL })
	}
}

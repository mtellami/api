import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderFound } from './order.found';

@Module({
  providers: [OrderService],
})
export class OrderModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
	   consumer
		.apply(OrderFound)
		.forRoutes({ path: 'order/:id', method: RequestMethod.ALL })
	}
}

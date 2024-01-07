import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OrderService } from './order/order.service';
import { OrderModule } from './order/order.module';
import { OrderController } from './order/order.controller';
import { ProductService } from './product/product.service';
import { ProductController } from './product/product.controller';
import { ProductModule } from './product/product.module';
import { ConfigModule } from '@nestjs/config';
import { MulterModule } from '@nestjs/platform-express';
import MulterConfig from 'services/multer.service';

@Module({
  imports: [
		ConfigModule.forRoot(),
		OrderModule,
		ProductModule,
		MulterModule.register(MulterConfig)],
  controllers: [AppController, OrderController, ProductController],
  providers: [AppService, OrderService, ProductService],
})
export class AppModule {}

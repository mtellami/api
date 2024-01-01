import { Controller, Get } from '@nestjs/common';
import { Order } from 'types/order';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
	constructor(private readonly orderService: OrderService) {}

	@Get()
	async getAll(): Promise<Order[]> {
		return this.orderService.getAll()
	}
}

// GET all orders
//
// GET order by id
// POST, create new order
// Patch, update order
// DELETE, remove order by id

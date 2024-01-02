import { Body, Controller, Delete, Get, NotFoundException, Param, Patch, Post, Res } from '@nestjs/common';
import { Order } from 'types/order';
import { OrderService } from './order.service';
import { Response } from 'express'
import { OrderDto } from 'dto/order.dto';

@Controller('order')
export class OrderController {
	constructor(private readonly orderService: OrderService) {}

	@Get()
	async getAll(): Promise<Order[]> {
		return this.orderService.getAll()
	}

	@Post()
	async createOrder(@Body() orderDto: OrderDto): Promise<Order> {
		return this.orderService.createOrder(orderDto)
	}

	@Get(':id')
	async getOrderById(@Param('id') id: number, @Res() res: Response): Promise<void> {
		const order = await this.orderService.getOrderById(id)
		if (!order) {
			throw new NotFoundException('Order Not Found')
		}
		res.status(200).json(order)
	}

	@Patch(':id')
	async updateOrder(@Body() orderDto: OrderDto, @Param('id') id: number): Promise<Order> {
		const order = await this.orderService.getOrderById(id)
		if (!order) {
			throw new NotFoundException('Order Not Found')
		}
		return this.orderService.updateOrder(orderDto, id)
	}

	@Delete(':id')
	async deleteOrder(@Res() res: Response, @Param('id') id: number): Promise<void> {
		const order = await this.orderService.getOrderById(id)
		if (!order) {
			throw new NotFoundException('Order Not Found')
		}
		await this.orderService.deleteOrder(id)
		res.status(200).json({ message: 'Order removed successfully' })
	}
}

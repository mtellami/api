import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Req,
	Res,
    UseGuards,
} from '@nestjs/common';
import { Order } from 'types/order';
import { OrderService } from './order.service';
import { Request, Response } from 'express'
import { OrderDto } from 'dto/order.dto';
import { OrderFound } from './order.guard';

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
	@UseGuards(OrderFound)
	async getOrderById(@Req() req: Request): Promise<Order> {
		return req.order
	}

	@Patch(':id')
	@UseGuards(OrderFound)
	async updateOrder(@Body() orderDto: OrderDto, @Param('id') id: number): Promise<Order> {
		return this.orderService.updateOrder(orderDto, id)
	}

	@Delete(':id')
	@UseGuards(OrderFound)
	async deleteOrder(@Res() res: Response, @Param('id') id: number): Promise<void> {
		await this.orderService.deleteOrder(id)
		res.status(200).json({ message: 'Order removed successfully' })
	}
}

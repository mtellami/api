import { BadRequestException, Injectable, NestMiddleware, NotFoundException } from "@nestjs/common";
import { OrderService } from "./order.service";
import { Request, Response, NextFunction } from "express";
import { Order } from "types/order";

@Injectable()
export class OrderFound implements NestMiddleware {
	constructor(private readonly orderService: OrderService) {}

	async use(req: Request, res: Response, next: NextFunction) {
		const id: number = parseInt(req.params.id)
		if (isNaN(id)) {
			throw new BadRequestException('Number Order Id Requered')
		}
		const order: Order = await this.orderService.getOrderById(id)
		if (!order) {
			throw new NotFoundException('Order Not Found')
		}
		req.order = order
		next()
	}
}

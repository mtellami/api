import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { OrderService } from "./order.service";
import { Order } from "types/order";
import { Observable } from "rxjs";

@Injectable()
export class OrderFound implements CanActivate {
	constructor(private readonly orderService: OrderService) {}
	canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest()
		const res = context.switchToHttp().getResponse()

		const id: number = parseInt(req.params.id)
		if (isNaN(id)) {
			res.status(404).json({ message: 'Order Not Found' })
		}
		return new Promise<boolean>(async (resolve) => {
			const order: Order = await this.orderService.getOrderById(id)
			if (!order) {
				res.status(404).json({ message: 'Order Not Found' })
				resolve(false)
			}
			req.order = order
			return resolve(true)
		})
  }
}

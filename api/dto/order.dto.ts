import { IsEnum, IsNumberString } from "class-validator"
import { OrderStatus } from "types/order"

export class OrderDto {
	@IsNumberString()
	price: number

	@IsEnum(OrderStatus)
	status: OrderStatus
}

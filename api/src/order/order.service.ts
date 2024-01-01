import { Injectable } from '@nestjs/common';
import db from 'db/mysql';
import { Order } from 'types/order';

@Injectable()
export class OrderService {
	async getAll(): Promise<Order[]> {
		const orders = await db.query('SELECT * FROM order')
		console.log(orders)
		return []
	}
}

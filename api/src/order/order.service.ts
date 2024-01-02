import { Injectable, InternalServerErrorException } from '@nestjs/common';
import db from 'db/mysql';
import { OrderDto } from 'dto/order.dto';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { Order } from 'types/order';

@Injectable()
export class OrderService {
	async getAll(): Promise<Order[]> {
		try {
			const [orders] = await db.query('SELECT * FROM `order`')
			return orders as Order[]
		} catch (err) {
			console.error(err)
			throw new InternalServerErrorException
		}
	}

	async getOrderById(id: number): Promise<Order | null> {
		try {
			const [[row]] = await db.query<RowDataPacket[]>(
				'SELECT * FROM `order` WHERE id = ?',
				[id]
			)
			if (!row) {
				return null
			}
			return row as Order
		} catch (err) {
			console.error(err)
			throw new InternalServerErrorException
		}
	}

	async createOrder(newOrder: OrderDto): Promise<Order> {
		try {
			const [row] = await db.query<ResultSetHeader>(
				'INSERT INTO `order` (price, status) VALUES (?, ?)',
				[newOrder.price, newOrder.status])
			return this.getOrderById(row.insertId)
		} catch (err) {
			console.error(err)
			throw new InternalServerErrorException
		}
	}

	async updateOrder(orderData: OrderDto, id: number): Promise<Order> {
		try {
			await db.query(
				'UPDATE `order` SET price = ?, status = ? WHERE id = ?',
				[orderData.price, orderData.status, id]
			)
			return this.getOrderById(id)
		} catch (err) {
			console.error(err)
			throw new InternalServerErrorException
		}
	}

	async deleteOrder(id: number): Promise<void> {
		try {
			await db.query(
				'DELETE FROM `order` WHERE id = ?',
				[id]
			)
		} catch (err) {
			console.error(err)
			throw new InternalServerErrorException
		}
	}
}

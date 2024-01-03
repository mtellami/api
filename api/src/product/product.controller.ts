import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import db from '../../db/mysql'
import { Product } from 'types/product';
import { RowDataPacket } from 'mysql2';

@Controller('product')
export class ProductController {
	@Get()
	async getAll(): Promise<Product[]> {
		try {
			const [row] = await db.query<RowDataPacket[]>(
				'SELECT * FROM `product`'
			)
			return row as Product[]
		} catch (err) {
			console.error(err)
			throw new InternalServerErrorException
		}
	}
}

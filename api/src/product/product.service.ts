import { Injectable, InternalServerErrorException } from '@nestjs/common';
import db from 'services/database.service';
import { ProductDto } from 'dto/product.dto';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { Product } from 'types/product';

@Injectable()
export class ProductService {
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

	async createProduct(product: ProductDto): Promise<Product> {
		try {
			const [row] =  await db.query<ResultSetHeader>(
				'INSERT INTO `product` (name, image, qte, price, category) VALUES (?, ?, ?, ?, ?)',
				[product.name, product.image, product.qte, product.price, product.category]
			)
			return this.getById(row.insertId)
		} catch (err) {
			console.error(err)
			throw new InternalServerErrorException
		}
	}

	async getById(id: number): Promise<Product | null> {
		try {
			const [[row]] = await db.query<RowDataPacket[]>(
				'SELECT * FROM `product` WHERE id = ?',
				[id]
			)
			return !row ? null : row as Product
		} catch (err) {
			console.error(err)
			throw new InternalServerErrorException
		}
	}

	async getCategoryProducts(category: string): Promise<Product[]> {
		try {
			const [row] = await db.query<RowDataPacket[]>(
				'SELECT * FROM `product` WHERE category = ?',
				[category]
			)
			return row as Product[]
		} catch (err) {
			console.error(err)
			throw new InternalServerErrorException
		}
	}

	async updateProduct(id: number, product: ProductDto): Promise<Product> {
		return {} as Product
	}

	async removeProduct(id: number): Promise<void> {
		try {
			await db.query(
				'DELETE FROM `product` WHERE id = ?',
				[id]
			)
		} catch (err) {
			console.error(err)
			throw new InternalServerErrorException
		}
	}
}

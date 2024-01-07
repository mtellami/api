import { Injectable, InternalServerErrorException } from '@nestjs/common';
import db from 'services/database.service';
import { CreateProductDto } from 'dto/createProduct.dto';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { Product } from 'types/product';
import { uploader } from 'services/cloud.service';
import { unlink } from 'fs/promises';
import { UpdateProductDto } from 'dto/updateProduct.dto';

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

	async createProduct(image: Express.Multer.File, product: CreateProductDto): Promise<Product> {
		try {
			const result = await uploader.upload(image.path)
			await unlink(image.path)
			const [row] =  await db.query<ResultSetHeader>(
				'INSERT INTO `product` (name, image, qte, price, category) VALUES (?, ?, ?, ?, ?)',
				[product.name, result.secure_url,  product.qte, product.price, product.category]
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

	async updateProduct(id: number, product: UpdateProductDto, image: Express.Multer.File): Promise<Product> {
		try {
			if (image) {
				const result = await uploader.upload(image.path)
				await unlink(image.path)
				product.image = result.secure_url
			}
			await db.query(
				`UPDATE \`product\` SET ${Object.keys(product).map(value => `${value} = ?`).join(', ')} WHERE id = ?`,
				[...Object.keys(product).map(key => product[key]), id]
			)
			return this.getById(id)
		} catch (err) {
			console.error(err)
			throw new InternalServerErrorException
		}
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

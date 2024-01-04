import { Body, Controller, Get, Post } from '@nestjs/common';
import { Product } from 'types/product';
import { ProductService } from './product.service';
import { ProductDto } from 'dto/product.dto';

@Controller('product')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@Get()
	async getProducts(): Promise<Product[]> {
		return this.productService.getAll()
	}

	@Post()
	async addproduct(@Body() productDto: ProductDto): Promise<Product> {
		return this.productService.createProduct(productDto)
	}
}

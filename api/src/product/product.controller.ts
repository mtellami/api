import { Body, Controller, Get, Param, Post, Req } from '@nestjs/common';
import { Product } from 'types/product';
import { ProductService } from './product.service';
import { ProductDto } from 'dto/product.dto';
import { Request } from 'express'

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

	@Get(':id')
	async getProductById(@Req() req: Request): Promise<Product> {
		return req.product
	}

	@Get('category/:category')
	async getCategoryProducts(@Param('category') category: string ): Promise<Product[]> {
		return this.productService.getCategoryProducts(category)
	}

	// Multer middleware for image upload with cloud provider
	// update product
	// delete product
}

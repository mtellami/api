import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Req,
	Res
} from '@nestjs/common';
import { Product } from 'types/product';
import { ProductService } from './product.service';
import { ProductDto } from 'dto/product.dto';
import { Request, Response } from 'express'

@Controller('product')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@Get()
	async getProducts(): Promise<Product[]> {
		return this.productService.getAll()
	}

	@Post()
	async addproduct(@Body() productDto: ProductDto): Promise<Product> {
		// use Multer and cloud for images
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


	@Patch(':id')
	async updateProduct(@Param() id: number, @Body() productDto: ProductDto ): Promise<Product> {
		// use Multer and cloud for images
		return this.productService.updateProduct(id, productDto)
	}
	
	@Delete(':id')
	async deleteProduct(@Param('id') id: number, @Res() res: Response): Promise<void> {
		await this.productService.removeProduct(id)
		res.status(200).json({ message: 'Product removed successfully' })
	}
}

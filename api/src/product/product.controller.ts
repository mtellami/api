import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	Req,
	Res,
    UploadedFile,
    UseInterceptors
} from '@nestjs/common';
import { Product } from 'types/product';
import { ProductService } from './product.service';
import { Request, Response } from 'express'
import { FileInterceptor } from '@nestjs/platform-express';
import { CreateProductDto } from 'dto/createProduct.dto';
import { UpdateProductDto } from 'dto/updateProduct.dto';

@Controller('product')
export class ProductController {
	constructor(private readonly productService: ProductService) {}

	@Get()
	async getProducts(): Promise<Product[]> {
		return this.productService.getAll()
	}

	@Post()
	@UseInterceptors(FileInterceptor('image'))
	async addproduct(@UploadedFile() image: Express.Multer.File, @Body() productDto: CreateProductDto): Promise<Product> {
		return this.productService.createProduct(image, productDto)
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
	@UseInterceptors(FileInterceptor('image'))
	async updateProduct(
		@Param('id') id: number,
		@Body() productDto: UpdateProductDto,
		@UploadedFile()image: Express.Multer.File): Promise<Product> {
		return this.productService.updateProduct(id, productDto, image)
	}
	
	@Delete(':id')
	async deleteProduct(@Param('id') id: number, @Res() res: Response): Promise<void> {
		await this.productService.removeProduct(id)
		res.status(200).json({ message: 'Product removed successfully' })
	}
}

import { BadRequestException, Injectable, NestMiddleware, NotFoundException } from "@nestjs/common"
import { ProductService } from "./product.service"
import { Request, Response, NextFunction } from "express"
import { Product } from "types/product"

@Injectable()
export class ProductFound implements NestMiddleware {
	constructor(private readonly productService: ProductService) {}

	async use(req: Request, _: Response, next: NextFunction) {
		const id: number = parseInt(req.params.id)
		if (isNaN(id)) {
			throw new BadRequestException('Invalid Product Id')
		}
		const product: Product = await this.productService.getById(id)
		if (!product) {
			throw new NotFoundException('Product Not Found')
		}
		req.product = product
		next()
	}
}

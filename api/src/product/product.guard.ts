import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common"
import { ProductService } from "./product.service"
import { Product } from "types/product"
import { Observable } from "rxjs"

@Injectable()
export class ProductFound implements CanActivate {
	constructor(private readonly productService: ProductService) {}
	canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest()
		const res = context.switchToHttp().getResponse()

		const id: number = parseInt(req.params.id)
		if (isNaN(id)) {
			res.status(404).json({ message: 'Product Not Found' })
		}
		return new Promise<boolean>(async (resolve) => {
			const order: Product = await this.productService.getById(id)
			if (!order) {
				res.status(404).json({ message: 'Product Not Found' })
				resolve(false)
			}
			req.order = order
			return resolve(true)
		})
  }
}

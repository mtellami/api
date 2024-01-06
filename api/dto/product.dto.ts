import { IsInt, IsNotEmpty, IsNumber, Length } from "class-validator"

export class ProductDto {
	@IsNotEmpty()
	@Length(0, 20)
	name: string

	@IsNotEmpty()
	image: string

	@IsInt()
	qte: number

	@IsNumber()
	price: number

	@Length(0, 15)
	category: string
}

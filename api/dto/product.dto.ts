import { IsInt, IsNotEmpty, IsNumberString, Length } from "class-validator"

export class ProductDto {
	@IsNotEmpty()
	@Length(0, 20)
	name: string

	@IsNotEmpty()
	image: string

	@IsInt()
	qte: number

	@IsNumberString()
	price: number

	@Length(0, 15)
	category: string
}

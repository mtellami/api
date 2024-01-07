import { IsNotEmpty, IsNumberString, Length } from "class-validator"

export class ProductDto {
	@IsNotEmpty()
	@Length(0, 20)
	name: string

	@IsNumberString()
	qte: number

	@IsNumberString()
	price: number

	@Length(0, 15)
	category: string
}

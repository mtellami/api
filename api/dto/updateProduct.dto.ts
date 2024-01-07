import { IsNumberString, IsOptional, Length } from "class-validator"

export class UpdateProductDto {
	@IsOptional()
	@Length(5, 20)
	name: string

	@IsOptional()
	image: string

	@IsOptional()
	@IsNumberString()
	qte: number

	@IsOptional()
	@IsNumberString()
	price: number

	@IsOptional()
	@Length(0, 15)
	category: string
}

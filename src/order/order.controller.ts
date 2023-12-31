import { Controller, Get } from '@nestjs/common';

@Controller('order')
export class OrderController {
	@Get()
	order() {
		return 'order'
	}
}

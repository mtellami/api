export enum OrderStatus {
	Requested = 'requested',
	Confirmed = 'confirmed',
	Delivered = 'delivered'
}

export type Order = {
	id: number,
	createdAt: Date,
	price: number,
	status: OrderStatus
}

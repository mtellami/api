export enum OrderStatus {
	Requested,
	Confirmed,
	Delivered
}

export type Order = {
	id: number,
	createdAt: Date,
	price: number,
	status: OrderStatus
}

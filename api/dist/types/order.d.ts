export declare enum OrderStatus {
    Requested = 0,
    Confirmed = 1,
    Delivered = 2
}
export type Order = {
    id: number;
    createdAt: Date;
    price: number;
    status: OrderStatus;
};

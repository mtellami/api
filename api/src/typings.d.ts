import { Order } from 'types/order';

declare global {
  namespace Express {
    interface Request {
      order?: Order;
    }
  }
}

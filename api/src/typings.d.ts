import { Order } from 'types/order';
import { Product } from 'types/product';

declare global {
  namespace Express {
    interface Request {
      order?: Order;
			product?: Product
    }
  }
}

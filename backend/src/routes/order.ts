import { Router } from 'express';
import createOrder from '../controllers/order';
import { validateCreateOrder } from '../middlewares/validations';

const orderRouter = Router();

orderRouter.post('/', validateCreateOrder, createOrder);

export default orderRouter;

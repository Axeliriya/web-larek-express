import { Router } from 'express';
import { getProducts, createProduct } from '../controllers/products';
import { validateCreateProduct } from '../middlewares/validations';

const productRouter = Router();

productRouter.get('/', getProducts);
productRouter.post('/', validateCreateProduct, createProduct);

export default productRouter;

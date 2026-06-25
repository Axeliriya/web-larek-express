import { NextFunction, Request, Response } from 'express';
import { faker } from '@faker-js/faker';
import Product from '../models/product';
import BadRequestError from '../errors/bad-request-error';

const createOrder = (req: Request, res: Response, next: NextFunction) => {
  const { items, total } = req.body;

  return Product.find({ _id: { $in: items } })
    .then((products) => {
      if (products.length !== items.length) {
        throw new BadRequestError('В заказе есть несуществующий товар');
      }

      let sum = 0;
      products.forEach((product) => {
        if (product.price === null) {
          throw new BadRequestError(`Товар "${product.title}" не продаётся`);
        }
        sum += product.price as number;
      });

      if (sum !== total) {
        throw new BadRequestError('Сумма заказа не совпадает со стоимостью товаров');
      }

      return res.send({ id: faker.string.uuid(), total });
    })
    .catch(next);
};

export default createOrder;

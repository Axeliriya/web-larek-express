import { celebrate, Joi, Segments } from 'celebrate';
import { Types } from 'mongoose';

const objectId = Joi.string().custom((value, helpers) => {
  if (Types.ObjectId.isValid(value)) {
    return value;
  }
  return helpers.error('any.invalid');
});

export const validateCreateProduct = celebrate({
  [Segments.BODY]: Joi.object().keys({
    title: Joi.string().required().min(2).max(30),
    image: Joi.object()
      .keys({
        fileName: Joi.string().required(),
        originalName: Joi.string().required(),
      })
      .required(),
    category: Joi.string().required(),
    description: Joi.string(),
    price: Joi.number().allow(null),
  }),
});

export const validateCreateOrder = celebrate({
  [Segments.BODY]: Joi.object().keys({
    payment: Joi.string().valid('card', 'online').required(),
    email: Joi.string().email().required(),
    phone: Joi.string().required(),
    address: Joi.string().required(),
    total: Joi.number().required(),
    items: Joi.array().items(objectId).min(1).required(),
  }),
});

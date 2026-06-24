import { NextFunction, Request, Response } from 'express';

interface IAppError extends Error {
  statusCode?: number;
}

export default (err: IAppError, _req: Request, res: Response, _next: NextFunction) => {
  const statusCode = err.statusCode ?? 500;
  const message = statusCode === 500 ? 'На сервере произошла ошибка' : err.message;

  res.status(statusCode).send({ message });
};

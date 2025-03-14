import { ErrorRequestHandler, NextFunction } from 'express';
import { ZodError } from 'zod';
import config from '../config';
import handleZodError from '../errors/handleZodError';
import { TErrorSources } from '../interface/error';
import handleValidationError from '../errors/handleValidationError';
import handleCastError from '../errors/handleCastError';
import handleDuplicateError from '../errors/handleDuplicateError';

const globalErrorHandler: ErrorRequestHandler = (
  err,
  req,
  res,
  next: NextFunction,
) => {
  //just for default:
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Something went wrong';

  let errorSources: TErrorSources[] = [
    {
      path: '',
      message: 'something went wrong',
    },
  ];

  // this is for zod:
  if (err instanceof ZodError) {
    const simplifiedError = handleZodError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.name === 'ValidationError') {
    const simplifiedError = handleValidationError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  } else if (err?.name === 'CastError') {
    const simplifiedError = handleCastError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }else if (err.code === 11000){
    const simplifiedError = handleDuplicateError(err);
    statusCode = simplifiedError?.statusCode;
    message = simplifiedError?.message;
    errorSources = simplifiedError?.errorSources;
  }

  res.status(statusCode).json({
    success: false,
    message,
    errorSources,
    // err,
    stack: config.node_env === 'development' ? err?.stack : null,
  });
};

export default globalErrorHandler;

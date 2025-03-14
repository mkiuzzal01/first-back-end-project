import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';
import status from 'http-status';

const handleValidationError = (
  err: mongoose.Error.ValidationError,
): TGenericErrorResponse => {
    
  const errorSources:TErrorSources[] = Object.keys(err.errors).map((key) => {
    const error = err.errors[key] as mongoose.Error.ValidatorError;

    return {
      path: error.path,
      message: error.message,
    };
  });

  return {
    statusCode: status.BAD_REQUEST,
    message: 'Validation error',
    errorSources,
  };
};

export default handleValidationError;

import mongoose from 'mongoose';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';
import status from 'http-status';

const handleCastError = (
  err: mongoose.Error.CastError,
): TGenericErrorResponse => {
  const errorSources: TErrorSources[] = [
    { path: err.path, message: err.message },
  ];

  return {
    statusCode: status.BAD_REQUEST,
    message: 'invalid id',
    errorSources,
  };
};

export default handleCastError;

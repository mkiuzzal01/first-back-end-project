import status from 'http-status';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handleDuplicateError = (error: any): TGenericErrorResponse => {
  const errorSources: TErrorSources[] = [
    {
      path: Object.keys(error.keyPattern || {})[0] || '', 
      message: 'Duplicate key error', 
    },
  ];

  return {
    statusCode: status.BAD_REQUEST,
    message: 'Duplicate key error',
    errorSources,
  };
};

export default handleDuplicateError;

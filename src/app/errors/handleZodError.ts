import { ZodError, ZodIssue } from 'zod';
import status from 'http-status';
import { TErrorSources, TGenericErrorResponse } from '../interface/error';

const handleZodError = (err: ZodError): TGenericErrorResponse => {
  const errorSources: TErrorSources[] = err.issues.map((issue: ZodIssue) => {
    return {
      path: issue?.path[issue.path.length - 1],
      message: issue.message,
    };
  });

  return {
    statusCode: status.BAD_REQUEST,
    message: 'validation error',
    errorSources,
  };
};

export default handleZodError;

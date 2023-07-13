import { Request, Response, NextFunction } from 'express';
import { BaseRequestResult } from '../../config/baseResultRequest';

interface CustomResponse<T> extends Response {
    sendResponse: (body?: any) => void;
    baseResponse: BaseRequestResult<T>;
}

export function responseMiddleware<T>(req: Request, res: CustomResponse<T>, next: NextFunction): void {
  const baseResponse: BaseRequestResult<T> = {
    error: false,
    message: undefined,
    dataResult: undefined,
  };

  res.baseResponse = baseResponse;

  res.sendResponse = function (dataResult?: any, message?: string, error?: boolean) {
    
    if (error) {
        res.baseResponse.error = error;
    }
    if (message) {
        res.baseResponse.message = message;
    }
    if (dataResult) {
        res.baseResponse.dataResult = dataResult;
    }

    res.send(res.baseResponse);
  };

  next();
}

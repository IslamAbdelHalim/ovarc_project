import { NextFunction, Request, Response } from "express";

import { AsyncMiddleware } from "../types/asyncMiddleWare.type";

const catchAsyncError = (fn: AsyncMiddleware) => {
    return (req: Request, res: Response, next: NextFunction) => {
        fn(req, res, next).catch(next);
    };
};

export default catchAsyncError;

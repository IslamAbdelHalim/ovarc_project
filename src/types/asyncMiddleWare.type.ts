import { NextFunction, Request, Response } from "express";

export type AsyncMiddleware = (
    req: Request,
    res: Response,
    next: NextFunction,
) => Promise<any>;

export type FunctionMiddleWare = (
    req: Request,
    res: Response,
    next: NextFunction,
) => void;
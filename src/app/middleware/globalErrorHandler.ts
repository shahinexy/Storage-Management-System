/* eslint-disable @typescript-eslint/no-unused-vars */
import { ErrorRequestHandler } from "express";
import config from "../config";

const GlobalErrorHandler: ErrorRequestHandler = (err, req, res, next): any => {
  const statusCode = 500;
  const message = err.message || "Validation error";

  return res.status(statusCode).json({
    success: false,
    message,
    error: err,
    stack: config.NODE_ENV === 'development' ? err?.stack : null
  });
};

export default GlobalErrorHandler;
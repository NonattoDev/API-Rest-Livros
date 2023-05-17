import mongoose from "mongoose";
import BaseError from "../errors/BaseError.js";
import ReqError from "../errors/ReqError.js";
import ErrorValidation from "../errors/ErrorValidation.js";

// eslint-disable-next-line no-unused-vars
const errorsIdentifier = (error, req, res, next) => {
  if (error instanceof mongoose.Error.CastError) {
    new ReqError().sendRes(res);
  } else if (error instanceof mongoose.Error.ValidationError) {
    new ErrorValidation(error).sendRes(res);
  } else {
    new BaseError().sendRes(res);
  }
};

export default errorsIdentifier;

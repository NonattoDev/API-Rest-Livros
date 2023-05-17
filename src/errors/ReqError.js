import BaseError from "./BaseError.js";

class ReqError extends BaseError {
  constructor(msg = "Um ou mais dados fornecidos estão incorretos") {
    super(msg, 400);
  }
}

export default ReqError;

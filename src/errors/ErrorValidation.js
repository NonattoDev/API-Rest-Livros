import ReqError from "./ReqError.js";

class ErrorValidation extends ReqError {
  constructor(error) {
    const errorsMsgs = Object.values(error.errors)
      .map((error) => error.message)
      .join("; ");

    super(`Os seguintes erros foram encontrados: ${errorsMsgs} `);
  }
}

export default ErrorValidation;

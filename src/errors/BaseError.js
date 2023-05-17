class BaseError extends Error {
  constructor(msg = "Erro interno do servidor !", status = 500) {
    super();

    this.message = msg;
    this.status = status;
  }

  sendRes(res) {
    res.status(this.status).send({
      message: this.message,
      status: this.status,
    });
  }
}

export default BaseError;

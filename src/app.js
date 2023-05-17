import express from "express";
import db from "./config/dbConnect.js";
import routes from "./routes/index.js";
import errorsIdentifier from "./middlewares/errorsIdentifier.js";

db.on("error", console.log.bind(console, "Erro de Conexão"));
db.once("open", () => {
  console.log("Database Connected Successfull");
});

const app = express();
app.use(express.json());
app.get("/livros", (req, res, next) => {
  console.log("Middleware registrado no GET da rota /livros");
  next();
});
routes(app);

// eslint-disable-next-line no-unused-vars
app.use(errorsIdentifier);

export default app;

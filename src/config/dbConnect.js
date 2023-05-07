import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://robsonnonatoiii:123@cluster0.j8oxvhm.mongodb.net/alura-node"
);

let db = mongoose.connection;

export default db;

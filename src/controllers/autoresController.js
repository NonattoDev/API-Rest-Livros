import mongoose from "mongoose";
import autores from "../models/Autor.js";

class AutorController {
  static listarAutores = async (req, res) => {
    try {
      const autoresResult = await autores.find();
      res.status(200).json(autoresResult);
    } catch (error) {
      res.status(500).json({ message: "Erro interno no servidor" });
    }
  };

  static listarAutorPorId = async (req, res) => {
    try {
      const { id } = req.params;

      const autoresResult = await autores.findById(id);

      if (autoresResult !== null) {
        res.status(200).json(autoresResult);
      } else {
        res.status(404).send({ message: "ID do autor não foi encontrado" });
      }
    } catch (error) {
      if (error instanceof mongoose.Error.CastError) {
        res
          .status(400)
          .send({ message: "Um ou mais dados fornecidos estão incorretos" });
      } else {
        res.status(500).send({ message: "Erro interno de Servidor." });
      }
    }
  };

  static cadastrarAutor = async (req, res) => {
    try {
      let autor = new autores(req.body);

      const autorResult = await autor.save();

      res.status(201).send(autorResult);
    } catch (error) {
      res.status(500).send({ message: "Falha ao cadastrar autor" });
    }
  };

  static atualizarAutor = async (req, res) => {
    try {
      const { id } = req.params;
      await autores.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).send({ message: "Autor atualizado com sucesso" });
    } catch (error) {
      res.status(500).send({ message: "Erro ao atualizar autor" });
    }
  };

  static excluirAutor = async (req, res) => {
    const { id } = req.params;
    try {
      await autores.findByIdAndDelete(id);

      res.status(200).send({ message: "Autor exluido com sucesso." });
    } catch (error) {
      res
        .status(500)
        .send({ message: `Não foi encontrado autor com ID:${id} ` });
    }
  };
}

export default AutorController;

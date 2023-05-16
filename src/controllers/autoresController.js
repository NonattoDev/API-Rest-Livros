import autores from "../models/Autor.js";

class AutorController {
  static listarAutores = async (req, res, next) => {
    try {
      const autoresResult = await autores.find();
      res.status(200).json(autoresResult);
    } catch (error) {
      next(error);
    }
  };

  static listarAutorPorId = async (req, res, next) => {
    try {
      const { id } = req.params;

      const autoresResult = await autores.findById(id);

      if (autoresResult !== null) {
        res.status(200).json(autoresResult);
      } else {
        res.status(404).send({ message: "ID do autor não foi encontrado" });
      }
    } catch (error) {
      next(error);
    }
  };

  static cadastrarAutor = async (req, res, next) => {
    try {
      let autor = new autores(req.body);

      const autorResult = await autor.save();

      res.status(201).send(autorResult);
    } catch (error) {
      next(error);
    }
  };

  static atualizarAutor = async (req, res, next) => {
    try {
      const { id } = req.params;
      await autores.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).send({ message: "Autor atualizado com sucesso" });
    } catch (error) {
      next(error);
    }
  };

  static excluirAutor = async (req, res, next) => {
    const { id } = req.params;
    try {
      await autores.findByIdAndDelete(id);

      res.status(200).send({ message: "Autor exluido com sucesso." });
    } catch (error) {
      next(error);
    }
  };
}

export default AutorController;

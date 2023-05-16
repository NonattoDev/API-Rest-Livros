import livros from "../models/Livro.js";

class LivroController {
  static listarLivros = async (req, res, next) => {
    try {
      const livroResult = await livros.find().populate("autor").exec();
      res.status(200).json(livroResult);
    } catch (error) {
      next(error);
    }
  };

  static listarLivroPorId = async (req, res, next) => {
    try {
      const { id } = req.params;
      const livroResult = await livros
        .findById(id)
        .populate("autor", "nome")
        .exec();
      res.status(200).json(livroResult);
    } catch (error) {
      next(error);
    }
  };

  static cadastrarLivro = async (req, res, next) => {
    try {
      let livro = new livros(req.body);
      const livroCadastro = await livro.save();
      res.status(201).send(livroCadastro.toJSON());
    } catch (error) {
      next(error);
    }
  };

  static atualizarLivro = async (req, res, next) => {
    try {
      const { id } = req.params;
      await livros.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).send({ message: "Livro atualizado com sucesso" });
    } catch (error) {
      next(error);
    }
  };

  static excluirLivro = async (req, res, next) => {
    try {
      const { id } = req.params;
      livros.findByIdAndDelete(id);
      res.status(200).send({ message: "Livro exluido com sucesso." });
    } catch (error) {
      next(error);
    }
  };

  static listarLivroPorEditora = async (req, res, next) => {
    try {
      const editora = req.query.editora;
      const livrosResult = await livros.find({ editora: editora });
      res.status(200).send(livrosResult);
    } catch (error) {
      next(error);
    }
  };
}

export default LivroController;

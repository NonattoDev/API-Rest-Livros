import livros from "../models/Livro.js";

class LivroController {
  static listarLivros = async (req, res) => {
    try {
      const livroResult = await livros.find().populate("autor").exec();
      res.status(200).json(livroResult);
    } catch (error) {
      res.status(500).json({ message: "Erro interno do servidor" });
    }
  };

  static listarLivroPorId = async (req, res) => {
    try {
      const { id } = req.params;
      const livroResult = await livros
        .findById(id)
        .populate("autor", "nome")
        .exec();
      res.status(200).json(livroResult);
    } catch (error) {
      res.status(400).send({ message: "Livro não encontrado!" });
    }
  };

  static cadastrarLivro = async (req, res) => {
    try {
      let livro = new livros(req.body);
      const livroCadastro = await livro.save();
      res.status(201).send(livroCadastro.toJSON());
    } catch (error) {
      res
        .status(500)
        .send({ message: `${error.message} - falha ao cadastrar livro` });
    }
  };

  static atualizarLivro = async (req, res) => {
    try {
      const { id } = req.params;
      await livros.findByIdAndUpdate(id, { $set: req.body });
      res.status(200).send({ message: "Livro atualizado com sucesso" });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };

  static excluirLivro = async (req, res) => {
    try {
      const { id } = req.params;
      livros.findByIdAndDelete(id);
      res.status(200).send({ message: "Livro exluido com sucesso." });
    } catch (error) {
      res.status(500).send({ message: error.message });
    }
  };

  static listarLivroPorEditora = async (req, res) => {
    try {
      const editora = req.query.editora;
      const livrosResult = await livros.find({ editora: editora });
      res.status(200).send(livrosResult);
    } catch (error) {
      res.status(500).send({ message: "Internal server error" });
    }
  };
}

export default LivroController;

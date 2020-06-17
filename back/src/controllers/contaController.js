const mongoose = require("mongoose");
const Conta = mongoose.model("Conta");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const createUserToken = (ContaId) => {
  return jwt.sign(
    {
      id: ContaId,
    },
    "NaJuLeClaflix"
  );
};

module.exports = {
  async cadastrarConta(req, res) {
    try {
      const conta = await Conta.create(req.body);
      conta.Senha = undefined;
      return res.status(201).json({
        conta,
        token: createUserToken(conta._id),
      });
    } catch (err) {
      return res.status(400).json({
        erro: err,
      });
    }
  },
  async login(req, res) {
    const { Email, Senha } = req.body;
    if (!Email || !Senha) {
      return res.status(400).json({
        mensagem: "Dados insuficientes",
      });
    }
    try {
      Conta.findOne({ Email: Email }, (err, conta) => {
        if (err) return res.status(400).json({ err });

        if (!conta) return res.status(400).json({ erro: "login invalido" });

        bcrypt.compare(Senha, conta.Senha, (err, same) => {
          if (!same) return res.status(400).json({ erro: "login invalido" });

          conta.Senha = undefined;
          return res.status(200).json({
            conta,
            token: createUserToken(conta._id),
          });
        });
      }).select("+Senha");
    } catch (err) {
      return res.status(400).json({
        erro: err,
      });
    }
  },
  async buscarContaLogada(req, res) {
    try {
      const conta = await Conta.findById(res.locals.auth_data.id);
      return res.json({ conta });
    } catch (err) {
      return res.status(400).json({
        erro: err,
      });
    }
  },
  // async uploadImage(req, res) {
  //     try {
  //         const usuario = await Usuario.updateOne({ _id: res.locals.auth_data.id },
  //             {$set: { UrlFoto: `files/${req.file.filename}` }});

  //             return res.status(200).json({
  //                 usuario
  //             });
  //     }
  //     catch (err) {
  //         return res.status(400).json({
  //             erro: err
  //         })
  //     }
  // }
  async editarConta(req, res) {
    try {
      const conta = await Conta.updateOne(
        { _id: req.params.id },
        {
          $set: {
            Senha: req.body.Senha,
            Telefone: req.body.Telefone,
          },
        }
      );
      return res.status(201).json({
        conta,
      });
    } catch (err) {
      return res.json({
        erro: err,
      });
    }
  },
  async deletarConta(req, res) {
    try {
      const conta = await Conta.findOne({ _id: req.params.id })
        .remove()
        .exec();
      conta.save();
      return res.status(200).json({
        conta: "Sucesso ao deletar a Conta",
      });
    } catch (err) {
      return res.json({
        erro: err,
      });
    }
  },
};

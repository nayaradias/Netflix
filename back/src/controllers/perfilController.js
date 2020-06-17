const mongoose = require("mongoose");
const Perfil = mongoose.model("Perfil");
const Conta = mongoose.model("Conta");
//Nome,Conta,Descricao,ImagemUrl,Restricao
module.exports = {
  async cadastrarPerfil(req, res) {
    try {
      const ContaId = res.locals.auth_data.id;
      req.body.Conta = ContaId;
      const perfil = await Perfil.create(req.body);
      const conta = await Conta.findById(ContaId);
      conta.Perfis.push(perfil._id);
      conta.save();
      return res.status(201).json({
        perfil,
      });

    } catch (err) {
      return res.json({
        erro: err,
      });
    }
  },
  async buscarPerfis(req, res) {
    //{_id: {$gt: lastViewedMessage._id}}
    try {
      const ContaId = res.locals.auth_data.id;
      const conta = await Conta.findById(ContaId, (err, conta) => {
        perfis = conta.Perfis;
          return res.status(201).json({
            perfis,
          });
        }).populate("Perfis");
    } catch (err) {
      return res.json({
        erro: err,
      });
    }
  },
  async editarPerfil(req, res) {
    try {
      const perfil = await Perfil.updateOne(
        { _id: req.params.id },
        {
          $set: {
            Nome: req.body.Nome,
            Descricao: req.body.Descricao,
            ImagemUrl: req.body.ImagemUrl,
            Restricao: req.body.Restricao,
          },
        }
      );
      return res.status(201).json({
        perfil,
      });
    } catch (err) {
      return res.json({
        erro: err,
      });
    }
  },
  async deletarPerfil(req, res) {
    try {
      const ContaId = res.locals.auth_data.id;
      const conta = await Conta.findById(ContaId);
      conta.Perfis.remove(req.params.id);
      conta.save();
      const perfil = await Perfil.findOne({ _id: req.params.id })
        .remove()
        .exec();
      perfil.save();
      
      return res.status(200).json({
        perfil: "Sucesso ao deletar o Perfil",
      });
    } catch (err) {
      return res.json({
        erro: err,
      });
    }
  },
};

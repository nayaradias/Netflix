const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const ContaSchema = new mongoose.Schema({
  Email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  Senha: {
    type: String,
    required: true,
    select: false,
  },
  Telefone: {
    type: String,
    required: false,
  },
  Perfis: [{
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Perfil'
  }]
});

ContaSchema.pre("save", function (next) {
  let conta = this;
  if (!conta.isModified("Senha")) return next();
  bcrypt.hash(conta.Senha, 10, (err, bcrypt) => {
    conta.Senha = bcrypt;
    return next();
  });
});
mongoose.model("Conta", ContaSchema);

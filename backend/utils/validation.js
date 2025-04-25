const Joi = require("joi");

const userSchema = Joi.object({
  nome: Joi.string().required(),
  idade: Joi.number().positive().required(),
  email: Joi.string().email().required(),
  telefone: Joi.string().required(),
  cep: Joi.string().required(),
  rua: Joi.string().required(),
  numero: Joi.string().required(),
  cidade: Joi.string().required(),
  senha: Joi.string().min(6).required(),
  tipo_usuario: Joi.string().valid("medico", "idoso", "cuidador"),
});

const medicamentoSchema = Joi.object({
  nome: Joi.string().required(),
  data_inicial: Joi.date().required(),
  data_final: Joi.date().required(),
  frequencia: Joi.string().required(),
  hora: Joi.string().required(),
  dose: Joi.string().required(),
  id_usuario: Joi.number().positive().required(),
  id_medico: Joi.number().positive().required(),
});

module.exports = {
  userSchema,
  medicamentoSchema,
};

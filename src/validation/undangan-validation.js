import Joi from "joi";

const createUndanganValidation = Joi.object({
  namaPengantin: Joi.string().max(100).required(),
  tanggal: Joi.date(),
  lokasi: Joi.string().max(100).required(),
  yourStatus: Joi.string()
    .valid("Hadir", "TidakHadir", "MungkinHadir")
    .required(),
});

const getUndanganValidation = Joi.number().positive().required();

const updateUndanganValidation = Joi.object({
  undanganId: Joi.number().positive().required(),
  namaPengantin: Joi.string().max(100).required(),
  tanggal: Joi.date(),
  lokasi: Joi.string().max(100).required(),
  yourStatus: Joi.string()
    .valid("Hadir", "TidakHadir", "MungkinHadir")
    .required(),
});

const searchUndanganValidation = Joi.object({
  page: Joi.number().min(1).positive().default(1),
  size: Joi.number().min(1).positive().max(100).default(10),
  namaPengantin: Joi.string().optional(),
  lokasi: Joi.string().optional(),
  yourStatus: Joi.string()
    .valid("Hadir", "TidakHadir", "MungkinHadir")
    .optional(),
});

export {
  createUndanganValidation,
  getUndanganValidation,
  updateUndanganValidation,
  searchUndanganValidation,
};

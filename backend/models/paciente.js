const mongoose = require ('mongoose');
// const { ObjectId } = require('bson');

const pacienteSchema = new mongoose.Schema({
  // _id: ObjectId,
  name: String,
  code: String
})

const pacienteModel = mongoose.model('Paciente', pacienteSchema);

module.exports = pacienteModel;

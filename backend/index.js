const mongoose = require('mongoose');
const { ObjectId } = require('bson');

mongoose.connect('mongodb+srv://admin:isEx1DAqFiQEo2k5@tcc.zpk1kby.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro na conexão com o MongoDB:'));
db.once('open', () => {
  console.log('Conexão com o MongoDB estabelecida com sucesso!');
});

const pacienteSchema = new mongoose.Schema({
    _id: ObjectId,
    name: String,
    email: String,
});

const Paciente = mongoose.model('Paciente', pacienteSchema);

exports.GetTcc = async () => {
    try {

      const pacientes = await Paciente.find({});
      console.log('Dados do Paciente:', pacientes);

      return pacientes;
    } catch (error) {
      console.error('Erro ao buscar dados do Paciente:', error);
      throw error;
    }
};


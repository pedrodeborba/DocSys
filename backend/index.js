const mongoose = require('mongoose');
const express = require ('express');
const cors = require ('cors'); 
const pacienteModel = require ('./models/paciente');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://admin:isEx1DAqFiQEo2k5@tcc.zpk1kby.mongodb.net/tcc', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Erro na conexão com o MongoDB:'));
db.once('open', () => {
  console.log('Conexão com o MongoDB estabelecida com sucesso!');
});

app.post('/paciente', (req,res) => {
  const {name} = req.body;
  const {code} = req.body;

  pacienteModel.findOne({name: name, code: code}).then(paciente => {
    if(paciente){
      if(paciente.name == name){
        res.json({msg: 'Usuário já cadastrado'});
      }
    }else{
      pacienteModel.create(req.body).then(paciente => res.json(paciente)).catch(err => res.json(err));
    }
  });

});

app.get('/paciente', (req, res) => {
  const { name } = req.query;

  pacienteModel.findOne({ name: name }).then(paciente => {
    if (paciente) {
      res.json(paciente);
    } else {
      res.json({ msg: 'Paciente não encontrado' });
    }
  }).catch(err => {
    res.status(500).json({ error: 'Erro ao buscar paciente', details: err.message });
  });
});

app.listen(3001, () => {
  console.log("Servidor no Ar!");
})


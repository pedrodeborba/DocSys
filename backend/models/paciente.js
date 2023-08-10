const { Paciente } = require('../index');

exports.GetTcc = async () => {
    try {
      const pacientesArray = await Paciente.find({});
      console.log('Dados do Paciente:', pacientesArray);

      return pacientesArray;
    } catch (error) {
      console.error('Erro ao buscar dados do Paciente:', error);
      throw error;
    }
};

// Chamada da função GetTcc
exports.GetTcc()
  .then(data => {
    console.log('Dados recebidos:', data);
  })
  .catch(error => {
    console.error('Erro ao buscar dados:', error);
  });

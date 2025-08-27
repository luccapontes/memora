const sequelize = require('../config/db');
const Usuario = require('./Usuario');

const initModels = async () => {
  try {
    await sequelize.authenticate();
    console.log('Conexão com o banco bem-sucedida!');
  } catch (error) {
    console.error('Erro ao conectar no banco:', error);
  }
};

module.exports = { initModels, Usuario };
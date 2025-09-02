const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const RespostaQuiz = sequelize.define('RespostaQuiz', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  quiz_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  respostas: {
    type: DataTypes.JSON,
    allowNull: false
  },
  nota: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  acertos: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  criado_em: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'respostas_quiz',
  timestamps: false
});

module.exports = RespostaQuiz;
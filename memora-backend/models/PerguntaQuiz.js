const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const PerguntaQuiz = sequelize.define('PerguntaQuiz', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  quiz_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  pergunta: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  alternativas: {
    type: DataTypes.JSON,
    allowNull: false
  },
  correta: {
    type: DataTypes.STRING(10),
    allowNull: false
  },
  resumo_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  materia: {
    type: DataTypes.STRING(100),
    allowNull: false,
    defaultValue: 'Geral'
  },
  turma_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  professor_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  criado_em: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'perguntas_quiz',
  timestamps: false
});

module.exports = PerguntaQuiz;
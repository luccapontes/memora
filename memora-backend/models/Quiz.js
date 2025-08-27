const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Quiz = sequelize.define('Quiz', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  titulo: {
    type: DataTypes.STRING(150),
    allowNull: false
  },
  materia: {
    type: DataTypes.STRING(100),
    allowNull: false,
    defaultValue: 'Geral'
  },
  professor_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  turma_id: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  criado_em: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'quizzes',
  timestamps: false
});

module.exports = Quiz;
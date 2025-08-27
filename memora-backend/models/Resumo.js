const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Resumo = sequelize.define('Resumo', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  titulo: { type: DataTypes.STRING(150), allowNull: true },
  conteudo: { type: DataTypes.TEXT, allowNull: false },
  materia: { type: DataTypes.STRING(100), allowNull: false },
  professor_id: { type: DataTypes.INTEGER, allowNull: true },
  turma_id: { type: DataTypes.INTEGER, allowNull: true },
  criado_em: { type: DataTypes.DATE, defaultValue: DataTypes.NOW }
}, {
  tableName: 'resumos',
  timestamps: false
});

module.exports = Resumo;
const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Usuario = sequelize.define('Usuario', {
  nome: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  senha_hash: { type: DataTypes.STRING, allowNull: false },
  tipo: { type: DataTypes.ENUM('aluno', 'professor', 'admin'), defaultValue: 'aluno' },
  cpf: DataTypes.STRING,
  aniversario: DataTypes.DATE,
  turma_id: DataTypes.INTEGER
}, {
  tableName: 'usuarios',
  timestamps: false
});

module.exports = Usuario;
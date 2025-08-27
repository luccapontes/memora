const express = require('express');
const router = express.Router();
const { Usuario } = require('../models');
const authMiddleware = require('../middlewares/auth');

// GET /usuarios — protegido
router.get('/', authMiddleware, async (req, res) => {
  try {
    const usuarios = await Usuario.findAll();
    res.json(usuarios);
  } catch (error) {
    console.error('Erro ao buscar usuários:', error);
    res.status(500).json({ error: 'Erro ao buscar usuários' });
  }
});

// GET /usuarios/me — retorna os dados do usuário autenticado
router.get('/me', authMiddleware, async (req, res) => {
  try {
    const usuario = await Usuario.findByPk(req.usuario.id, {
      attributes: { exclude: ['senha_hash'] } // opcional: esconde a senha
    });

    if (!usuario) {
      return res.status(404).json({ error: 'Usuário não encontrado' });
    }

    res.json(usuario);
  } catch (error) {
    console.error('Erro ao buscar usuário autenticado:', error);
    res.status(500).json({ error: 'Erro interno ao buscar usuário' });
  }
});

const bcrypt = require('bcrypt');

// POST /usuarios — cria um novo usuário
router.post('/', async (req, res) => {
  const { nome, email, senha, tipo, cpf, aniversario, turma_id } = req.body;

  try {
    // Verifica se já existe
    const existe = await Usuario.findOne({ where: { email } });
    if (existe) {
      return res.status(409).json({ error: 'E-mail já cadastrado' });
    }

    // Valida tipo
    if (tipo !== 'aluno' && tipo !== 'professor') {
      return res.status(400).json({ error: 'Tipo inválido: use "aluno" ou "professor"' });
    }

    // Cria hash da senha
    const senha_hash = await bcrypt.hash(senha, 10);

    // Cria o usuário
    const novoUsuario = await Usuario.create({
      nome,
      email,
      senha_hash,
      tipo,
      cpf,
      aniversario,
      turma_id
    });

    // Retorna sem a senha
    const { senha_hash: _, ...usuarioLimpo } = novoUsuario.toJSON();
    res.status(201).json(usuarioLimpo);
  } catch (error) {
    console.error('Erro ao cadastrar usuário:', error);
    res.status(500).json({ error: 'Erro interno ao cadastrar usuário' });
  }
});

module.exports = router;
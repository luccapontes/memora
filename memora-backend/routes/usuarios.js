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

module.exports = router;
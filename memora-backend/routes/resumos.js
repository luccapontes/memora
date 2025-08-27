const express = require('express');
const router = express.Router();
const { Resumo, Usuario } = require('../models');
const authMiddleware = require('../middlewares/auth');
const { Op } = require('sequelize');

// POST /resumos — apenas para professores
router.post('/', authMiddleware, async (req, res) => {
  const { titulo, conteudo, materia, turma_id } = req.body;

  if (req.usuario.tipo !== 'professor') {
    return res.status(403).json({ error: 'Apenas professores podem criar resumos.' });
  }

  try {
    const novoResumo = await Resumo.create({
      titulo,
      conteudo,
      materia,
      turma_id,
      professor_id: req.usuario.id
    });

    res.status(201).json(novoResumo);
  } catch (error) {
    console.error('Erro ao criar resumo:', error);
    res.status(500).json({ error: 'Erro ao criar resumo' });
  }
});

// GET /resumos — para alunos visualizarem por turma
router.get('/', authMiddleware, async (req, res) => {
  const { materia, busca } = req.query;

  try {
    const usuario = await Usuario.findByPk(req.usuario.id);
    const turma_id = usuario.turma_id;

    if (!turma_id) {
      return res.status(400).json({ error: 'Usuário sem turma vinculada.' });
    }

    const where = { turma_id };

    if (materia && materia !== 'Todas') {
      where.materia = materia;
    }

    if (busca) {
      where[Op.or] = [
        { titulo: { [Op.like]: `%${busca}%` } },
        { conteudo: { [Op.like]: `%${busca}%` } }
      ];
    }

    const resumos = await Resumo.findAll({
      where,
      order: [['criado_em', 'DESC']]
    });

    res.json(resumos);
  } catch (error) {
    console.error('Erro ao buscar resumos:', error);
    res.status(500).json({ error: 'Erro ao buscar resumos' });
  }
});

// GET /resumos/:id — ver resumo completo
router.get('/:id', authMiddleware, async (req, res) => {
    const { id } = req.params;
  
    try {
      const resumo = await Resumo.findByPk(id);
  
      if (!resumo) {
        return res.status(404).json({ error: 'Resumo não encontrado' });
      }
  
      // ⚠️ (opcional) Validar se o usuário pertence à turma do resumo:
      // Se for aluno, só pode ver resumos da própria turma
      if (req.usuario.tipo === 'aluno') {
        const usuario = await Usuario.findByPk(req.usuario.id);
        if (usuario.turma_id !== resumo.turma_id) {
          return res.status(403).json({ error: 'Resumo não disponível para sua turma' });
        }
      }
  
      res.json(resumo);
    } catch (error) {
      console.error('Erro ao buscar resumo por ID:', error);
      res.status(500).json({ error: 'Erro ao buscar resumo' });
    }
  });

module.exports = router;
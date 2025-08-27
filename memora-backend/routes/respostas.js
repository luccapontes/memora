const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const { Quiz, RespostaQuiz } = require('../models');

// POST /respostas-quizzes
router.post('/', authMiddleware, async (req, res) => {
  const { quiz_id, respostas } = req.body;
  const usuario_id = req.usuario.id;

  try {
    const quiz = await Quiz.findByPk(quiz_id);
    if (!quiz) return res.status(404).json({ error: 'Quiz não encontrado' });

    const existente = await RespostaQuiz.findOne({ where: { quiz_id, usuario_id } });
    if (existente) return res.status(400).json({ error: 'Quiz já respondido' });

    const perguntas = quiz.perguntas;
    let acertos = 0;

    perguntas.forEach((pergunta, index) => {
      const respostaAluno = respostas[(index + 1).toString()];
      if (respostaAluno && respostaAluno === pergunta.correta) {
        acertos++;
      }
    });

    const nota = (acertos / perguntas.length) * 10;

    await RespostaQuiz.create({
      usuario_id,
      quiz_id,
      respostas,
      nota,
      acertos
    });

    res.status(201).json({
      mensagem: 'Quiz respondido com sucesso!',
      nota,
      acertos
    });
  } catch (err) {
    console.error('Erro ao responder quiz:', err);
    res.status(500).json({ error: 'Erro interno ao processar quiz' });
  }
});

module.exports = router;
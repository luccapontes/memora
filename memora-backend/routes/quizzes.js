const express = require('express');
const router = express.Router();
const Quiz = require('../models/Quiz');
const PerguntaQuiz = require('../models/PerguntaQuiz');
const authMiddleware = require('../middlewares/auth');

router.post('/', authMiddleware, async (req, res) => {
  const { titulo, materia, turma_id, professor_id, perguntas } = req.body;

  try {
    if (!perguntas || perguntas.length < 5) {
      return res.status(400).json({ error: 'O quiz deve conter no mínimo 5 perguntas.' });
    }

    // Cria o quiz
    const quiz = await Quiz.create({
      titulo,
      materia,
      turma_id,
      professor_id
    });

    // Cria cada pergunta
    for (const pergunta of perguntas) {
      await PerguntaQuiz.create({
        quiz_id: quiz.id,
        pergunta: pergunta.pergunta,
        alternativas: pergunta.alternativas,
        correta: pergunta.correta,
        materia,
        turma_id,
        professor_id
      });
    }

    res.status(201).json({ mensagem: 'Quiz criado com sucesso!', quiz_id: quiz.id });

  } catch (error) {
    console.error('Erro ao criar quiz:', error);
    res.status(500).json({ error: 'Erro interno ao criar o quiz.' });
  }
});

module.exports = router;
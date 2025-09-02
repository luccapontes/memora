const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth');
const { Quiz, PerguntaQuiz, RespostaQuiz, Usuario } = require('../models');
const { Op } = require('sequelize');

// POST /respostas-quizzes
router.post('/', authMiddleware, async (req, res) => {
  const { quiz_id, respostas } = req.body;
  const usuario_id = req.usuario.id;

  try {
    if (!quiz_id || !Array.isArray(respostas)) {
      return res.status(400).json({ error: 'Dados incompletos ou inválidos' });
    }

    const quiz = await Quiz.findByPk(quiz_id);
    if (!quiz) return res.status(404).json({ error: 'Quiz não encontrado' });

    const existente = await RespostaQuiz.findOne({ where: { quiz_id, usuario_id } });
    if (existente) return res.status(400).json({ error: 'Quiz já respondido' });

    const perguntas = await PerguntaQuiz.findAll({ where: { quiz_id }, order: [['id', 'ASC']] });
    if (perguntas.length === 0) return res.status(400).json({ error: 'Quiz sem perguntas' });

    let acertos = 0;
    const gabarito = [];

    perguntas.forEach((pergunta, index) => {
      const alternativas = Array.isArray(pergunta.alternativas)
        ? pergunta.alternativas
        : JSON.parse(pergunta.alternativas || '[]');

      const letraCorreta = pergunta.correta.trim().toUpperCase();
      const idxCorreta = letraCorreta.charCodeAt(0) - 65; // A = 0, B = 1, etc.

      const respostaAlunoLetra = respostas[index]?.trim().toUpperCase();
      const idxRespostaAluno = respostaAlunoLetra?.charCodeAt(0) - 65;

      const acertou = idxRespostaAluno === idxCorreta;
      if (acertou) acertos++;

      gabarito.push({
        pergunta: pergunta.pergunta,
        alternativas,
        correta: alternativas[idxCorreta],
        resposta_usuario: alternativas[idxRespostaAluno],
        acertou
      });
    });

    const nota = (acertos / perguntas.length) * 10;

    await RespostaQuiz.create({
      usuario_id,
      quiz_id,
      respostas: JSON.stringify(respostas),
      nota,
      acertos
    });

    res.status(201).json({
      mensagem: 'Quiz respondido com sucesso!',
      nota,
      acertos,
      gabarito
    });
  } catch (err) {
    console.error('Erro ao responder quiz:', err);
    res.status(500).json({ error: 'Erro interno ao processar quiz' });
  }
});

// ROTA 1 - LISTAR QUIZZES RESPONDIDOS COM DETALHES
router.get('/', authMiddleware, async (req, res) => {
  const usuario_id = req.usuario.id;

  try {
    const respostas = await RespostaQuiz.findAll({
      where: { usuario_id },
      include: [{ model: Quiz }],
      order: [['createdAt', 'DESC']]
    });

    const resultado = [];

    for (const resposta of respostas) {
      const quiz = resposta.Quiz;
      const perguntas = await PerguntaQuiz.findAll({
        where: { quiz_id: quiz.id },
        order: [['id', 'ASC']]
      });

      const respostasUsuario = JSON.parse(resposta.respostas);

      const gabarito = perguntas.map((p, index) => {
        const alternativaCorreta = p.alternativas[JSON.parse(p.alternativas).indexOf(p.correta)] || p.correta;
        return {
          pergunta: p.pergunta,
          alternativas: JSON.parse(p.alternativas),
          correta: alternativaCorreta,
          resposta_usuario: respostasUsuario[index],
          acertou: respostasUsuario[index]?.trim().toUpperCase() === p.correta.trim().toUpperCase()
        }
      });

      resultado.push({
        quiz_id: quiz.id,
        titulo: quiz.titulo,
        materia: quiz.materia,
        nota: resposta.nota,
        acertos: resposta.acertos,
        total: perguntas.length,
        gabarito
      });
    }

    res.json({ quizzes_respondidos: resultado });
  } catch (err) {
    console.error('Erro ao buscar quizzes respondidos:', err);
    res.status(500).json({ error: 'Erro interno ao buscar quizzes respondidos' });
  }
});


// ROTA 2 - DESEMPENHO POR MATÉRIA
router.get('/desempenho', authMiddleware, async (req, res) => {
  const usuario_id = req.usuario.id;

  try {
    const respostas = await RespostaQuiz.findAll({
      where: { usuario_id },
      include: [{ model: Quiz }]
    });

    const desempenho = {};

    for (const resposta of respostas) {
      const quiz = resposta.Quiz;
      const materia = quiz.materia || 'Geral';

      if (!desempenho[materia]) {
        desempenho[materia] = {
          total_quizzes: 0,
          total_acertos: 0,
          total_perguntas: 0,
          soma_notas: 0
        };
      }

      desempenho[materia].total_quizzes++;
      desempenho[materia].total_acertos += resposta.acertos;
      desempenho[materia].soma_notas += resposta.nota;

      const perguntas = await PerguntaQuiz.count({ where: { quiz_id: quiz.id } });
      desempenho[materia].total_perguntas += perguntas;
    }

    const resultado = Object.entries(desempenho).map(([materia, dados]) => {
      return {
        materia,
        quizzes_respondidos: dados.total_quizzes,
        media_nota: (dados.soma_notas / dados.total_quizzes).toFixed(2),
        percentual_acerto: ((dados.total_acertos / dados.total_perguntas) * 100).toFixed(2) + '%'
      };
    });

    res.json({ desempenho: resultado });
  } catch (err) {
    console.error('Erro ao calcular desempenho:', err);
    res.status(500).json({ error: 'Erro interno ao calcular desempenho' });
  }
});


module.exports = router;
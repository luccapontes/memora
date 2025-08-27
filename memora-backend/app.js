const express = require('express');
const { initModels } = require('./models');
require('dotenv').config();

const app = express();
app.use(express.json());

const usuarioRoutes = require('./routes/usuarios');
app.use('/usuarios', usuarioRoutes);

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

initModels();

app.get('/', (req, res) => {
  res.send('API Memora funcionando!');
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
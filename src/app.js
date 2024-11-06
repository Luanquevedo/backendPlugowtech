const express = require('express');
const userRoutes = require('./routes/userRoutes');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);

// Inicialização do servidor na porta da variavel
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
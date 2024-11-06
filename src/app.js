const express = require('express');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(express.json());
app.use('/api/users', userRoutes);

// Inicialização do servidor na porta da variavel
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
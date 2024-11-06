const pool = require('../config/db')
const bcrypt = require('bcrypt');

//cadastro usuario teste

const register = async (req, res) => {
    const { username, password } = req.body;
    
    try {
        // Hash da senha ou criptografia de senha
        const hashedPassword = await bcrypt.hash(password, 10);

        // Inserção no banco de dados com codigo SQL
        const result = await pool.query(
            'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
            [username, hashedPassword]
        );

        res.status(201).json({ message: 'Usuário registrado com sucesso!', user: result.rows[0] });
    } catch (error) {
        console.error(error);

        // Verifica se erro é nome de usuário duplicata
        if (error.code === '23505') {
            res.status(400).json({ error: 'Nome de usuário já existe.' });
        } else {
            res.status(500).json({ error: 'Ocorreu um erro ao registrar o usuário.' });
        }
    }
};

module.exports = { register };
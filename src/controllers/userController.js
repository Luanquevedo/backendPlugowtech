const pool = require('../config/db')
const bcrypt = require('bcrypt');

//cadastro usuario teste

const register = async (req, res) => {
    const { username, password } = req.body;
    
    try{
        const hashedPassword = await bcrypt.hash(password, 10);
        const result = await pool.query(
            'INSERT INTO Users (username, password) VALUES ($1, $2) RETURNING *'
            [username, hashedPassword]
        );

        res.status(201).json({ message: 'User Registered', user: result.rows [0]});
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while registering the user'});
    }
};

module.exports = { register };
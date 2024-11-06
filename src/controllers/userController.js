const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const bcrypt = require('bcryptjs');


const register = async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await prisma.user.create({
      data: {
        username,
        password: hashedPassword,
      },
    });

    res.status(201).json({ message: 'User Registered', user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while registering the user' });
  }
};

module.exports = { register };

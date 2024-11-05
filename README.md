├── src/
│   ├── config/
│   │   ├── db.js              # Configuração do banco de dados PostgreSQL
│   │   ├── redis.js           # Configuração do Redis
│   │
│   ├── controllers/
│   │   ├── authController.js   # Controlador para autenticação
│   │   └── userController.js    # Controlador para gerenciamento de usuários
│   │
│   ├── middlewares/
│   │   ├── authMiddleware.js    # Middleware de autenticação
│   │   ├── rateLimiter.js       # Middleware de limitação de taxa
│   │   └── csrfProtection.js    # Middleware para proteção CSRF com csurf
│   │
│   ├── models/
│   │   ├── userModel.js         # Modelo de usuário (interação com o banco de dados)
│   │
│   ├── routes/
│   │   ├── authRoutes.js        # Rotas de autenticação
│   │   └── userRoutes.js        # Rotas de gerenciamento de usuários
│   │
│   ├── services/
│   │   ├── userService.js       # Lógica de negócios relacionada a usuários
│   │
│   ├── utils/
│   │   ├── jwtUtils.js          # Funções utilitárias para JWT
│   │
│   └── app.js                   # Configuração principal do aplicativo Express
│
├── .env                          # Variáveis de ambiente
├── package.json                  # Dependências e scripts do projeto
└── README.md                     
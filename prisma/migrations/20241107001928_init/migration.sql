ALTER TABLE "User"
ADD COLUMN "username" TEXT NOT NULL UNIQUE,
ADD COLUMN "password" TEXT NOT NULL;

-- (Opcional) Remover o campo "email", caso não precise mais
ALTER TABLE "User" DROP COLUMN "email";

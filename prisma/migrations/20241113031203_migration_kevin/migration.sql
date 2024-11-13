-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "password" TEXT,
    "accessLevel" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "cpfCnpj" TEXT NOT NULL,
    "functionalDocument" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "companyStore" TEXT NOT NULL,
    "dateOfBirth" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

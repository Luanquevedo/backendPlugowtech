const { z } = require('zod');

const userSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  cpfOrCnpj: z.string().min(11, "CPF ou CNPJ é obrigatório"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  functionalDoc: z.string(),
  birthDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Data de nascimento inválida",
  }),
  partnerOrCompany: z.string().optional(),
  accessLevel: z.number().int(),
  status: z.boolean().optional(),
});

module.exports = userSchema;

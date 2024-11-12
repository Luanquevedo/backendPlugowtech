const { z } = require('zod');

const userSchema = z.object({
  name: z.string()
    .min(1, "Nome é obrigatório"),

  cpfOrCnpj: z.string()
    .min(11, "CPF ou CNPJ é obrigatório")
    .max(14, 'Não deve conter mais de 14 digitos'),

  email: z.string()
    .email("Email inválido"),

  password: z.string()
    .min(8, "Senha deve ter pelo menos 8 caracteres"),

  functionalDoc: z.string(),

  birthDate: z.string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Data de nascimento inválida",
    })
    .min(10, "Data de nascimento deve estar no formato YYYY-MM-DD"),

  partnerOrCompany: z.string().optional(),

  accessLevel: z.number().int(),

  status: z.boolean().optional(),
});

module.exports = userSchema;



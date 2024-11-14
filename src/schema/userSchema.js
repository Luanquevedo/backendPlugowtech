import { z } from "zod";

// Expressões regulares para CPF e CNPJ
const cpfRegex = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/; // Exemplo: 123.456.789-00
const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/; // Exemplo: 12.345.678/0001-90
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Validação simples de e-mail

// Define o schema para o usuário
const userSchema = z.object({
  id: z.string().optional(),
  username: z
    .string()
    .min(3, "Username must be at least 3 characters long") // Validação do username
    .max(50, "Username must be at most 50 characters long")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username must only contain letters, numbers, and underscores"
    ), // Username apenas com letras, números e underscores
  email: z
    .string()
    .email("Invalid email format")
    .regex(emailRegex, "Invalid email format"), // Email validado com regex,
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[@$!%*?&]/, "Password must contain at least one special character"), // Validação de senha
  companyStore: z
    .string()
    .min(3, "Company name must be at least 3 characters long")
    .max(100, "Company name must be at most 100 characters long"), // Nome da empresa
  cpfCnpj: z
    .string()
    .regex(cpfRegex, "Invalid CPF format")
    .or(z.string().regex(cnpjRegex, "Invalid CNPJ format")),
  status: z.enum(["active", "inactive"]).default("active"), // Valor padrão para status
  accessLevel: z.enum(["admin", "usuario", "empresa", "consultor"]),
  professionalDocument: z
    .string()
    .min(5, "Professional document must be at least 5 characters long")
    .max(20, "Professional document must be at most 20 characters long"), // Documento profissional
  dateOfBirth: z
    .string()
    .refine((val) => !isNaN(Date.parse(val)), {
      message: "Invalid date format",
    })
    .transform((val) => new Date(val)), // Converte a string para um objeto Date
  updatedAt: z.string().default(new Date().toISOString()), // Valor padrão para updatedAt
});

const loginSchema = z.object({
  usernameOrEmail: z
    .string()
    .min(3, "Username or email must be at least 3 characters long")
    .max(50, "Username or email must be at most 50 characters long")
    .regex(
      /^[a-zA-Z0-9_]+$/,
      "Username must only contain letters, numbers, and underscores"
    ).or(z.string().email("Invalid email format")),  // Permite username ou email
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
    .regex(/[a-z]/, "Password must contain at least one lowercase letter")
    .regex(/[0-9]/, "Password must contain at least one number")
    .regex(/[@$!%*?&]/, "Password must contain at least one special character"),
});


// Função para validar dados de entrada com o schema definido
export const safeParse = (data) => userSchema.safeParse(data);
export const safeParseLogin = (data) => loginSchema.safeParse(data)

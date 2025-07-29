import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

// Hashea la contraseña antes de guardar (debes llamar a esta función manualmente)
const hashPassword = async (password) => {
  const bcrypt = await import('bcryptjs');
  return await bcrypt.hash(password, 10);
};

export const createUser = async (userData) => {
  const hashedPassword = await hashPassword(userData.password);
  return await prisma.user.create({
    data: {
      name: userData.name ?? "",
      email: userData.email ?? "",
      password: hashedPassword,
      role: "user", // valor por defecto
    }
  });
};

export const findUserByEmail = async (email) => {
  return await prisma.user.findUnique({ 
    where: { email },
    select: {
      id: true,
      name: true,
      email: true,
      password: true,
      role: true
    }
  });
};

export const comparePasswords = async (plainPassword, hashedPassword) => {
  const bcrypt = await import('bcryptjs');
  return await bcrypt.compare(plainPassword, hashedPassword);
};

export const findUserById = async (id) => {
  return await prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      name: true,
      email: true,
      role: true
    }
  });
};
// Nueva función para generar token JWT
export const generateAuthToken = (id, role) => {
  const payload = { id, role };
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    throw new Error('JWT_SECRET no está definido');
  }

  return jwt.sign(payload, secret, { expiresIn: '7d' });
};

// Nueva función para verificar token
export const verifyToken = (token) => {
  const secret = process.env.JWT_SECRET;
  if (!secret) throw new Error('JWT_SECRET no está definido');
  return jwt.verify(token, secret);
};
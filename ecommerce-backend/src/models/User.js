import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();
const jwtSecret = process.env.JWT_SECRET

// Hashea la contraseña antes de guardar (debes llamar a esta función manualmente)
const hashPassword = async (password) => {
  const bcrypt = await import('bcryptjs');
  return await bcrypt.hash(password, 10);
};

export const createUser = async (userData) => {
  const hashedPassword = await hashPassword(userData.password);
  return await prisma.user.create({
    data: {
      ...userData,
      password: hashedPassword
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
export const generateAuthToken = (userId, role) => {
  return jwt.sign(
    { id: userId, role },
    jwtSecret,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

// Nueva función para verificar token
export const verifyToken = (token) => {
  return jwt.verify(token, jwtSecret);
};
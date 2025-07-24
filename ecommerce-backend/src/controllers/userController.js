import { PrismaClient } from "@prisma/client";
import { createUser, findUserByEmail } from "../models/User.js";
const prisma = new PrismaClient();

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const userExists = await prisma.user.findUnique({ where: { email } });

    if (userExists) {
      return res.status(400).json({ error: "El usuario ya existe" });
    }

    const newUser = await prisma.user.create({
      data: { name, email, password },
    });

    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: "Error al registrar usuario" });
  }
};

export { registerUser };

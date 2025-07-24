// src/routes/userRoutes.js
import express from "express";
import { registerUser } from "../controllers/userController.js";
import { findUserByEmail, comparePasswords } from "../models/User.js"; // Named import
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/", registerUser);

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);
    if (!user) return res.status(401).json({ message: "Usuario no encontrado" });

    const isMatch = await comparePasswords(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Contraseña incorrecta" });

    const token = jwt.sign(
      { id: user.id, role: user.role },  // Usa user.id en lugar de user._id
      process.env.JWT_SECRET || "secreto",
      { expiresIn: "7d" }
    );

    res.json({ 
      token, 
      user: { 
        id: user.id, 
        name: user.name, 
        email: user.email, 
        role: user.role 
      } 
    });
  } catch (err) {
    res.status(500).json({ message: "Error en el servidor" });
  }
});

export default router;
import jwt from "jsonwebtoken";
import { findUserById } from "../models/User.js";

export const protect = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No autorizado" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secreto");
    req.user = await findUserById(decoded.id);
    
    if (!req.user) {
      return res.status(401).json({ message: "Usuario no encontrado" });
    }

    next();
  } catch (err) {
    res.status(401).json({ message: "Token inválido" });
  }
};

// Middleware para verificar roles (ejemplo: admin)
export const adminProtect = async (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: "Acceso denegado" });
  }
  next();
};
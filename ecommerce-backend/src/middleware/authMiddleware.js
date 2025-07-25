import { verifyToken } from '../models/User.js';

const protect = async (req, res, next) => {
  const token = req.cookies.token;
  
  if (!token) {
    return res.status(401).json({ message: "No autorizado, no hay token" });
  }

  try {
    const decoded = verifyToken(token);
    req.user = { id: decoded.id, role: decoded.role };
    next();
  } catch (err) {
    res.status(401).json({ message: "Token inválido" });
  }
};

const adminProtect = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    return res.status(403).json({ message: "Acceso denegado. Se requiere rol de admin" });
  }
  next();
};

export { protect, adminProtect };
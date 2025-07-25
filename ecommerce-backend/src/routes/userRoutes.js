import express from 'express';
import { registerUser, loginUser, logoutUser } from '../controllers/userController.js';
import { protect, adminProtect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);

// Ejemplo de ruta protegida
router.get('/profile', protect, (req, res) => {
  res.json({ message: "Acceso a perfil autorizado", user: req.user });
});

// Ejemplo de ruta solo para admin
router.get('/admin', protect, adminProtect, (req, res) => {
  res.json({ message: "Panel de administrador" });
});

export default router;
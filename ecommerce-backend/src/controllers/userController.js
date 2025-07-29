import {
  createUser,
  findUserByEmail,
  comparePasswords,
  generateAuthToken
} from '../models/User.js';

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    
    const userExists = await findUserByEmail(email);
    if (userExists) {
      return res.status(400).json({ error: "El usuario ya existe" });
    }

    const user = await createUser({ name, email, password });
    console.log('Usuario creado:', user);
    
    const token = generateAuthToken(user.id, user.role);
    
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(201).json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    });
  } catch (error) {
    console.error('Error en registerUser:', error);
    res.status(500).json({ error: "Error al registrar usuario" });
  }
};


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await findUserByEmail(email);
    if (!user) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const isMatch = await comparePasswords(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Credenciales inválidas" });
    }

    const token = generateAuthToken(user.id, user.role);
    
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    });
  } catch (err) {
    res.status(500).json({ message: "Error en el servidor" });
  }
};

const logoutUser = (req, res) => {
  res.clearCookie('token');
  res.status(200).json({ message: "Sesión cerrada" });
};

export { registerUser, loginUser, logoutUser };
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { User, IUser } from '../models/User';

interface AuthRequest extends Request {
  user?: IUser;
}

export const register = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email, cpf, birthDate, class: userClass, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }, { cpf }]
    });

    if (existingUser) {
      res.status(400).json({
        message: 'Usuário já existe com este e-mail ou CPF'
      });
      return;
    }

    // Create new user
    const user = new User({
      name,
      email,
      cpf,
      birthDate,
      class: userClass,
      password
    });

    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id.toString() },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.status(201).json({
      message: 'Usuário criado com sucesso',
      user: user.toJSON(),
      token
    });
  } catch (error) {
    console.error('Erro no registro:', error);
    res.status(500).json({
      message: 'Erro interno do servidor'
    });
  }
};

export const login = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      res.status(401).json({
        message: 'E-mail ou senha incorretos'
      });
      return;
    }

    // Check if user is active
    if (!user.isActive) {
      res.status(401).json({
        message: 'Conta desativada'
      });
      return;
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      res.status(401).json({
        message: 'E-mail ou senha incorretos'
      });
      return;
    }

    // Update last login
    user.lastLogin = new Date();
    await user.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id.toString() },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: process.env.JWT_EXPIRES_IN || '7d' }
    );

    res.json({
      message: 'Login realizado com sucesso',
      user: user.toJSON(),
      token
    });
  } catch (error) {
    console.error('Erro no login:', error);
    res.status(500).json({
      message: 'Erro interno do servidor'
    });
  }
};

export const getProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        message: 'Usuário não autenticado'
      });
      return;
    }

    res.json({
      user: req.user.toJSON()
    });
  } catch (error) {
    console.error('Erro ao buscar perfil:', error);
    res.status(500).json({
      message: 'Erro interno do servidor'
    });
  }
};

export const updateProfile = async (req: AuthRequest, res: Response): Promise<void> => {
  try {
    if (!req.user) {
      res.status(401).json({
        message: 'Usuário não autenticado'
      });
      return;
    }

    const { name, email, cpf, birthDate, class: userClass } = req.body;

    // Check if email or CPF already exists (excluding current user)
    const existingUser = await User.findOne({
      $and: [
        { _id: { $ne: req.user._id } },
        { $or: [{ email }, { cpf }] }
      ]
    });

    if (existingUser) {
      res.status(400).json({
        message: 'E-mail ou CPF já está em uso'
      });
      return;
    }

    // Update user
    const updatedUser = await User.findByIdAndUpdate(
      req.user._id,
      {
        name,
        email,
        cpf,
        birthDate,
        class: userClass
      },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      res.status(404).json({
        message: 'Usuário não encontrado'
      });
      return;
    }

    res.json({
      message: 'Perfil atualizado com sucesso',
      user: updatedUser.toJSON()
    });
  } catch (error) {
    console.error('Erro ao atualizar perfil:', error);
    res.status(500).json({
      message: 'Erro interno do servidor'
    });
  }
}; 
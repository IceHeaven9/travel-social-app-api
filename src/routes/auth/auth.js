import { Router } from 'express';
import { validateEmailAuthRoutes } from './validate-email.js';
import { loginAuthRoutes } from './login.js';
import { registerAtuhRoute } from './register.js';

export const authRoutes = Router();

authRoutes.use(registerAtuhRoute);

authRoutes.use(loginAuthRoutes);

authRoutes.use(validateEmailAuthRoutes);

import { Router } from 'express';
import { requiredAuth } from '../middlewares/validateToken.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { registerSchema, loginSchema } from '../schemas/auth.schema.js';
import { 
    register,
    login,
    logout,
    profile
} from '../controllers/auth.controller.js';

const router = Router();

router.post('/register', validateSchema(registerSchema), register);
router.post('/login', validateSchema(loginSchema) ,login);
router.post('/logout', logout);
router.get('/profile', requiredAuth, profile);

export default router;
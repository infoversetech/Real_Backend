import { Router } from 'express';
import { LoginDto } from '../validations';
import { ValidateRequest } from '../middlewares/validation';
import { authController } from '../controllers/auth.controller';

const router: Router = Router();

// Admin Routes
router.post('/admin-login', [ValidateRequest(LoginDto)], authController.adminLogin);

// User Routes
router.post('/login', [ValidateRequest(LoginDto)], authController.userLogin);

export default router;

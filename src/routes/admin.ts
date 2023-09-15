import { Router } from 'express';
import { AdminDto } from '../validations';
import { adminController } from '../controllers/admin.controller';
import { authController } from '../controllers/auth.controller';
import { ValidateRequest } from '../middlewares/validation';
import { AdminAuth } from '../middlewares/adminAuth';

const router: Router = Router();

router.get('/check-token', [AdminAuth], authController.checkToken);

router.post('/', [AdminAuth, ValidateRequest(AdminDto)], adminController.create);
router.get('/', [AdminAuth], adminController.getAll);
router.get('/:id', [AdminAuth], adminController.getById);
router.put('/:id', [AdminAuth, ValidateRequest(AdminDto)], adminController.update);
router.delete('/:id', [AdminAuth], adminController.delete);

export default router;

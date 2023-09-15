import { Router } from 'express';
import { RoleDto } from '../validations/role.request';
import { roleController } from '../controllers/role.controller';
import { ValidateRequest } from '../middlewares/validation';
import { AdminAuth } from '../middlewares/adminAuth';

const router: Router = Router();

router.post('/', [AdminAuth, ValidateRequest(RoleDto)], roleController.create);
router.get('/', [AdminAuth], roleController.getAll);
router.get('/:id', [AdminAuth], roleController.getOne);
router.put('/:id', [AdminAuth, ValidateRequest(RoleDto)], roleController.update);
router.delete('/:id', [AdminAuth], roleController.delete);

export default router;

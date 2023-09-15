import { Router } from 'express';
import { adminPropertyController } from '../../controllers/admin.property.controller';
import { ValidateRequest } from '../../middlewares/validation';
import { PropertyChangeStatusDto } from '../../validations';
import { AdminAuth } from '../../middlewares/adminAuth';

const router: Router = Router();

router.get('/all', [AdminAuth], adminPropertyController.getAll);
router.get('/detail/:id', [AdminAuth], adminPropertyController.getById);
router.put('/change-status/:id', [AdminAuth, ValidateRequest(PropertyChangeStatusDto)], adminPropertyController.changeStatus);

export default router;

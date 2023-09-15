import { Router } from 'express';
import { UserDto } from '../validations';
import { userController } from '../controllers/user.controller';
import { authController } from '../controllers/auth.controller';
import { ValidateRequest } from '../middlewares/validation';
import { Auth } from '../middlewares/auth';

const router: Router = Router();

router.get('/check-token', [Auth], authController.checkToken);

router.post('/', [Auth, ValidateRequest(UserDto)], userController.create);
router.get('/', [Auth], userController.getAll);
router.get('/:id', [Auth], userController.getById);
router.put('/:id', [Auth, ValidateRequest(UserDto)], userController.update);
router.delete('/:id', [Auth], userController.delete);

export default router;

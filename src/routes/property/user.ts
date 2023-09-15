import { Router } from 'express';
import { propertyController } from '../../controllers/property.controller';
import { Auth } from '../../middlewares/auth';

import { ValidateRequest } from '../../middlewares/validation';
import { PropertyDto } from '../../validations';

const router: Router = Router();

// master data route
router.get('/get-masters', [Auth], propertyController.getMasters);

router.post('/', [Auth, ValidateRequest(PropertyDto)], propertyController.create);
router.get('/', [Auth], propertyController.getAll);
router.get('/search', [Auth], propertyController.search);
router.get('/:id', [Auth], propertyController.getById);
router.put('/:id', [Auth, ValidateRequest(PropertyDto)], propertyController.update);

export default router;

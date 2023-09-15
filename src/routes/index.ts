import { Router } from 'express';

import healthRouter from './health';
import authRouter from './auth';
import adminRouter from './admin';
import userRouter from './user';
import roleRouter from './role';
import propertyRouter from './property';

const router: Router = Router();

router.use('/health', healthRouter);
router.use('/auth', authRouter);
router.use('/admin', adminRouter);
router.use('/user', userRouter);
router.use('/role', roleRouter);
router.use('/property', propertyRouter);

export default router;

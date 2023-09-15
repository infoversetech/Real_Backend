import { Router, Request, Response } from 'express';
import { StandardResponse } from '../types/response';

const router: Router = Router();

router.get('/', (req: Request, res: Response<StandardResponse<any>>) => {
    return res.send({ status: 'success', message: 'I am healthy !!' });
});

export default router;

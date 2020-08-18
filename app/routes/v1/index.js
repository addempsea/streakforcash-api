import { Router } from 'express';
import userRouter from './users';

const router = Router();

router.use('/auth', userRouter);

export default router;

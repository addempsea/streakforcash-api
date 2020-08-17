import { Router } from 'express';
import userRoutes from './users';
import questionRoutes from './question';
import categoryRoutes from './category';

const router = Router();

router.use('/user', userRoutes);
router.use('/question', questionRoutes);
router.use('/category', categoryRoutes);

export default router;

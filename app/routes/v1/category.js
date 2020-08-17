import { Router } from 'express';
import CategoryController from '../../controllers/category';

const { createCategory } = CategoryController;

const router = Router();

router.post('/', createCategory);

export default router;

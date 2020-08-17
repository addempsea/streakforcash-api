import { Router } from 'express';
import QuestionController from '../../controllers/question';
import QuestionMiddleware from '../../middlewares/question';

const { createQuestion } = QuestionController;
const { createQuestionValidator } = QuestionMiddleware;

const router = Router();

router.post('/', createQuestionValidator, createQuestion);

export default router;

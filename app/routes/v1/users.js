import { Router } from 'express';
import AuthController from '../../controllers/auth/index';
import AuthMiddleWare, { validateUserInput } from '../../middlewares/auth/basic';
import { signUpSchema } from '../../validations/auth';

const { createHashedPassword, checkIfUserAlreadyExist } = AuthMiddleWare;

const { signUpUser, updateUserVerificationStatus } = AuthController;
const userRouter = Router();

userRouter.post('/signup', validateUserInput(signUpSchema), createHashedPassword, checkIfUserAlreadyExist, signUpUser);

userRouter.get('/verify/email', updateUserVerificationStatus);

export default userRouter;

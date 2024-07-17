import { Router } from 'express';
import { registerUser, confirmEmail, loginUser, getCurrentUser, changeUserRole } from '../controllers/userController';
import { authenticateJWT, authorizeRole } from '../middleware/auth';

const router = Router();

router.post('/users/register', registerUser);
router.get('/confirm/:confirmationCode', confirmEmail);
router.post('/users/login', loginUser);
router.get('/users/me', authenticateJWT, getCurrentUser);
router.put('/users/:id/role', authenticateJWT, authorizeRole(1), changeUserRole);

export default router;

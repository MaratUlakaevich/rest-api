import { Router } from 'express';

import {
  addBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} from '../controllers/bookController';
import { authenticateJWT, authorizeRole } from '../middleware/auth';

const router = Router();

router.post('/books', authenticateJWT, authorizeRole(1), addBook); // assuming role 1 is admin
router.get('/books', getBooks);
router.get('/books/:id', getBookById);
router.put('/books/:id', authenticateJWT, authorizeRole(1), updateBook);
router.delete('/books/:id', authenticateJWT, authorizeRole(1), deleteBook);

export default router;

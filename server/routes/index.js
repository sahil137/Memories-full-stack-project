import express from 'express';
import postRoutes from './posts.js';
import userRoutes from './user.js';
const router = express.Router();

router.use('/posts', postRoutes);
router.use('/user', userRoutes);
export default router;

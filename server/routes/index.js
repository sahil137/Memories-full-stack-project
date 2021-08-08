import express from 'express';
import postRoutes from './posts.js';
const router = express.Router();

router.use('/posts', postRoutes);

export default router;

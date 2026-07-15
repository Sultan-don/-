import express from 'express';
import eventRoutes from './eventRoutes';
import contactRoutes from './contactRoutes';

const router = express.Router();

router.use('/events', eventRoutes);
router.use('/contact', contactRoutes);

export default router;
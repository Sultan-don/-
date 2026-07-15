import express from 'express';

const router = express.Router();

// Handle contact form submission
router.post('/', (req, res) => {
  // Logic to handle contact form submission
  res.status(201).json({ message: 'Contact form submitted' });
});

export default router;
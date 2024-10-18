// routes/feedback.js

const express = require('express');
const router = express.Router();
const Teacher = require('../models/Teacher');

// Submit feedback on a teacher
router.post('/:teacherId/feedback', async (req, res) => {
  const { studentId, rating, comments } = req.body;

  try {
    const teacher = await Teacher.findById(req.params.teacherId);

    if (!teacher) {
      return res.status(404).send('Teacher not found');
    }

    // Add feedback to teacher's profile (simple example)
    teacher.feedback.push({ studentId, rating, comments });
    teacher.rating = calculateAverageRating(teacher.feedback);  // Update teacher's rating
    await teacher.save();

    res.json(teacher);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Helper function to calculate the average rating
const calculateAverageRating = (feedback) => {
  const sum = feedback.reduce((total, feedback) => total + feedback.rating, 0);
  return sum / feedback.length;
};

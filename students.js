// routes/students.js

const express = require('express');
const router = express.Router();
const Student = require('../models/Student');

// Student selects courses and preferences
router.post('/:id/selectCourses', async (req, res) => {
  const studentId = req.params.id;
  const { courseIds, teacherPreferences } = req.body;

  try {
    const student = await Student.findById(studentId);

    // Update student's selected courses and teacher preferences
    student.selectedCourses = courseIds;
    student.preferences = teacherPreferences;
    
    await student.save();
    res.json(student);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

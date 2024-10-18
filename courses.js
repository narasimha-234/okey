// routes/courses.js

const express = require('express');
const router = express.Router();
const Course = require('../models/Course');
const Teacher = require('../models/Teacher');

// Route to assign teacher to a course
router.put('/:courseId/assignTeacher', async (req, res) => {
  const { teacherId } = req.body;
  try {
    const course = await Course.findById(req.params.courseId);
    const teacher = await Teacher.findById(teacherId);

    // Check if teacher is available to teach this course
    if (!teacher || !course) {
      return res.status(404).send('Course or teacher not found');
    }

    // Add teacher to the course
    course.teacherAssignments.push(teacher._id);
    await course.save();

    res.json(course);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

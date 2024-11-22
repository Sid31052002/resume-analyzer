const express = require('express');
const multer = require('multer');
const { analyzeResumes } = require('../controllers/resumeController');

const router = express.Router();

// Multer configuration
const upload = multer({
    dest: 'uploads/',
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB limit
    fileFilter: (req, file, cb) => {
        if (file.mimetype !== 'application/pdf') {
            return cb(new Error('Only PDF files are allowed!'));
        }
        cb(null, true);
    },
});

// Multiple file upload route
router.post('/upload', upload.array('resumes', 5), analyzeResumes);

module.exports = router;

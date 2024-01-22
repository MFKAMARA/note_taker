const router = require('express').Router();

// Import our modular routers for /tips and /feedback
const notesRouter = require('./notes');
const feedbackRouter = require('./feedback');
const diagnosticsRouter = require('./diagnostics');
//http://localhost:3001/api/notes
router.use('/notes', notesRouter);

//http://localhost:3001/api/feedback
router.use('/feedback', feedbackRouter);

//http://localhost:3001/api/diagnostics
router.use('/diagnostics', diagnosticsRouter);

module.exports = router;

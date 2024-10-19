const express = require('express');
const router = express.Router();
const { getNotes, CreateNote, getNoteById, UpdateNote,DeleteNote } = require('../controllers/notesController.js');
const { protect } = require('../middlewares/authMiddleware.js');

router.route('/').get(protect, getNotes)
router.route('/create').post(protect, CreateNote)
router
    .route("/:id")
    .get(getNoteById)
    .put(protect, UpdateNote)
    .delete (protect, DeleteNote);

module.exports = router
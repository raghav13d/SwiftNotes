const asyncHandler = require('express-async-handler');
const Note = require('../models/notesModel');

const getNotes = asyncHandler(async (req, res) => {
    const notes = await Note.find({ user: req.user._id });
    res.json(notes);
});

const CreateNote = asyncHandler(async (req, res) => {
    const { title, content, category } = req.body;

    if (!title || !content || !category) {
        res.status(400);
        throw new Error("Please Fill all the feilds");
    } else {
        const note = new Note({ user: req.user._id, title, content, category });

        const createdNote = await note.save();

        res.status(201).json(createdNote);
    }
});

const getNoteById = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id);
  
    if (note) {
      res.json(note);
    } else {
      res.status(404).json({ message: "Note not found" });
    }
});

const UpdateNote =asyncHandler(async(req,res)=>{
    const { title, content, category } = req.body;
  
    const note = await Note.findById(req.params.id);
  
    if (note.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("You cannot perform this action");
    }
  
    if (note) {
      note.title = title;
      note.content = content;
      note.category = category;
  
      const updatedNote = await note.save();
      res.json(updatedNote);
    } else {
      res.status(404);
      throw new Error("Note not found");
    }

})

const DeleteNote = asyncHandler(async (req, res) => {
    const note = await Note.findById(req.params.id);

    if (note.user.toString() !== req.user._id.toString()) {
        res.status(401);
        throw new Error("You cannot perform this action");
    }

    if (note) {
        await Note.deleteOne({ _id: req.params.id });
        res.json({ message: "Note removed" });
    } else {
        res.status(404);
        throw new Error("Note not found");
    }
});

module.exports = { getNotes, CreateNote, getNoteById,UpdateNote ,DeleteNote};
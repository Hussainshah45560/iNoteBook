const express = require("express");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Notes = require("../Models/Notes");
const { body, validationResult } = require("express-validator");

// ROUTE 1: get all the notes.
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  const notes = await Notes.find({ user: req.user.id });
  res.json(notes);
});

// ROUTE 2: Ceate new notes.
router.post(
  "/addnote",
  fetchuser,
  [
    [
      body("title", "Title must be at least 3 characters").isLength({ min: 3 }),
      body("description", "Description must be at least 3 characters").isLength(
        { min: 3 }
      ),
    ],
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }
      const { title, description, tag } = req.body;
      const note = new Notes({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();
      res.json(savedNote);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

// ROUTE 3: update note
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  // create a new note object
  try{
  const newNote = {};
  if (title) {
    newNote.title = title
  };
  if (description) {
    newNote.description = description
  };
  if (tag) {
    newNote.tag = tag
  };
  //find the note to be update and update it
  let note = await Notes.findById(req.params.id);
  if (!note) {
    return res.status(404).send("Not found");
  }

  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("Not allowed");
  }

  note = await Notes.findByIdAndUpdate(
    req.params.id,
    { $set: newNote },
    { new: true }
  );
  res.json({ note });

}catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});


  // ROUTE 3: delete note
router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  const { title, description, tag } = req.body;
  //find the note to be update and update it
  try{

  let note = await Notes.findById(req.params.id);
  if (!note) {
    return res.status(404).send("Not found");
  }

  if (note.user.toString() !== req.user.id) {
    return res.status(401).send("Not allowed");
  }

  note = await Notes.findByIdAndDelete(req.params.id,);
  res.json({ "Sucess": "Note has been deleted", note: note });
 } catch (err) {
    console.error(err.message);
    res.status(500).send("Internal Server Error");
  }
});
module.exports = router;

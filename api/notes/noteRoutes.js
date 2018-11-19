const express = require("express");
const router = express.Router();
// const jwt = require('jsonwebtoken');

const Note = require("./Note");

/*
    @route  GET notes/
    @desc   Retrieve all notes in the database
    @access Private (Production) | Public (Development)
*/
router.get("/", (req, res) => {
  Note.find()
    .select("title body id createdBy")
    .populate("createdBy", "username -_id")
    .then(notes => {
      res.status(200).json(notes);
    })
    .catch(err => {
      res.status(500).json({ Error: "Notes not found" });
    });
});

/*
    @route  POST notes/
    @desc   Create a new note
    @access Private (Production) | Public (Development)
*/
router.post("/", (req, res) => {
  Note.create(req.body)
    .then(() => {
      res.status(201);
    })
    .catch(() => {
      res.status(400).json({ Err: "error creating note" });
    });
});

/*
    @route  GET notes/:id
    @desc   Retrieve a specific note using ID
    @access Private (Production) | Public (Development)
*/
router.get("/:id", (req, res) => {
  const id = req.params.id;

  Note.findById(id)
    .select("title body id createdBy")
    .populate("createdBy", "username -_id")
    .then(note => {
      res.status(200).json(note);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

/*
    @route  PUT notes/:id
    @desc   Edit an existing note by ID
    @access Private (Production) | Public (Development)
*/
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const note = req.body;

  Note.findByIdAndUpdate(id, note)
    .then(() => {
      res.status(200);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

/*
    @route  DELETE notes/:id
    @desc   Delete a note by ID
    @access Private (Production) | Public (Development)
*/
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  Note.findByIdAndRemove(id)
    .then(() => {
      res.status(200);
    })
    .catch(err => {
      res.status(400).json(err);
    });
});

module.exports = router;

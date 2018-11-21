const express = require("express");
const router = express.Router();
const passport = require("passport");
// const jwt = require('jsonwebtoken');

const Note = require("./Note");

/*
    @route  GET notes/
    @desc   Retrieve all notes in the database
    @access Private (Production) | Public (Development)
*/
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Note.find({ createdBy: req.user._id })
      .then(notes => {
        res.status(200).json(notes);
      })
      .catch(err => {
        res.status(500).json({ Error: "Notes not found" });
      });
  }
);

/*
    @route  POST notes/
    @desc   Create a new note
    @access Private (Production) | Public (Development)
*/
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    Note.create(req.body)
      .then(() => {
        res.status(201).json("Created");
      })
      .catch(() => {
        res.status(400).json({ Err: "error creating note" });
      });
  }
);

/*
    @route  GET notes/:id
    @desc   Retrieve a specific note using ID
    @access Private (Production) | Public (Development)
*/
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const id = req.params.id;

    Note.findById(id)
      .then(note => {
        res.status(200).json(note);
      })
      .catch(err => {
        res.status(400).json(err);
      });
  }
);

/*
    @route  PUT notes/:id
    @desc   Edit an existing note by ID
    @access Private (Production) | Public (Development)
*/
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const id = req.params.id;
    const note = req.body;

    Note.findByIdAndUpdate(id, note)
      .then(() => {
        res.status(200).json("Success");
      })
      .catch(err => {
        res.status(400).json(err);
      });
  }
);

/*
    @route  DELETE notes/:id
    @desc   Delete a note by ID
    @access Private (Production) | Public (Development)
*/
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  (req, res) => {
    const id = req.params.id;

    Note.findByIdAndRemove(id)
      .then(() => {
        res.status(200).json("Deleted");
      })
      .catch(err => {
        res.status(400).json(err);
      });
  }
);

module.exports = router;

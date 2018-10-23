const express = require("express");
const router = express.Router();
// const jwt = require('jsonwebtoken');

const Note = require("./Note");

// // Helper Function
// const validateToken = (req, res, next) => {
//     const token = req.headers.authorization;
//     if (!token) {
//         res.status(422).json({ Error: 'No token found' })
//     } else {
//         jwt.verify(token, process.env.TOKEN_SECRET, (err, decoded) => {
//             if (err) {
//                 res.status(401).json({ Error: "Token invalid", message: err });
//             } else {
//                 next();
//             }
//         })
//     }
// }

/*
    @route  notes
    @desc   Retrieve all notes with selectors (title, body, id, createdBy)
    @access Private (Production) | Public (Development)
*/
router.get("/", (req, res) => {
  Note.find()
    .select("title body id createdBy")
    .populate("createdBy", "username -_id")
    .then(notes => {
      res.status(200).json({ notes });
    })
    .catch(err => {
      res.status(500).json({ Error: "Notes not found" });
    });
});

/*
    @route  notes
    @desc   Create a new note
    @access Private (Production) | Public (Development)
*/
router.post("/", (req, res) => {
  Note.create(req.body)
    .then(note => {
      res.status(201).json({ note });
    })
    .catch(err => {
      res.status(500).json({ Err: "error creating note" });
    });
});

/*
    @route  notes/:id
    @desc   Retrieve a specific note using ID
    @access Private (Production) | Public (Development)
*/
router.get("/:id", (req, res) => {
  const id = req.params.id;

  Note.findById(id)
    .select("title body id createdBy")
    .populate("createdBy", "username -_id")
    .then(note => {
      res.status(200).json({ note });
    })
    .catch(err => {
      res.status(404).json({ Error: "Cannot fulfill request " });
    });
});

/*
    @route  notes/:id
    @desc   Edit an existing note by ID
    @access Private (Production) | Public (Development)
*/
router.put("/:id", (req, res) => {
  const id = req.params.id;
  const note = req.body;

  Note.findByIdAndUpdate(id, note)
    .then(response => {
      res.status(200).json({ note });
    })
    .catch(err => {
      res.status(500).json({ err: "Cannot edit" });
    });
});

/*
    @route  notes/:id
    @desc   Delete a note by ID
    @access Private (Production) | Public (Development)
*/
router.delete("/:id", (req, res) => {
  const id = req.params.id;

  Note.findByIdAndRemove(id)
    .then(note => {
      res.status(200).send("Note deleted successfully");
    })
    .catch(err => {
      res.status(500).json({ Error: "Cannot delete " });
    });
});

module.exports = router;

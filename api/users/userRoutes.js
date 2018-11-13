const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const User = require('./User');

// // Helper Functions
// const getTokenForUser = userObject => {
//     return jwt.sign(userObject, process.env.TOKEN_SECRET, { expiresIn: '24h' })
// }

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
    @route  POST users
    @desc   Create a new user(register)
    @access Public
*/
router.post('/', (req,res) => {
    User
    .create(req.body)
    .then(user => {
        const token = getTokenForUser({ username: user.username })
        res.status(201).json({ user, token })
    })
    .catch(err => {
        res.status(500).json({ Error: err})
    })
})

/*
    @route  GET users
    @desc   Retrieve the list of users
    @access Private
*/
router.get('/', (req, res) => {
    User
    .find()
    .then(users => {
        res.status(200).json({ users })
    })
    .catch(err => {
        res.status(500).json({ Error: err })
    })
})

/*
    @route  GET users/:id
    @desc   Retrieve a specific user(login)
    @access Private 
*/
router.get('/:id', (req, res) => {
    const id = req.params.id;

    User
    .findById(id).select('-_id -__v')
    .then(user => {
        res.status(200).json({ user })
    })
    .catch(err => {
        res.status(404).json({ Message: "User not found" })
    })
})

/*
    @route  PUT users/:id
    @desc   Edit a user's information by ID
    @access Private
*/
router.put('/:id', (req, res) => {
    const id = req.params.id;
    const updateUser = req.body;

    User
    .findByIdAndUpdate(id, updateUser)
    .then(user => {
        res.status(200).json({ updateUser })
    })
    .catch(err => {
        res.status(400).json({ Message: "User not found" })
    })
})

/*
    @route  DELETE users/:id
    @desc   Delete a user's information by ID
    @access Private
*/
router.delete('/user/:id', (req, res) => {
    const id = req.params.id;

    User
    .findByIdAndRemove(id)
    .then(user => {
        res.status(200).send('User is deleted')
    })
    .catch(err => {
        res.status(404).json({ Error: 'User not found' })
    })
})

module.exports = router;
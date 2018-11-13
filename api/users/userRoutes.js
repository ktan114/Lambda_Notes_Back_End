const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const passport = require('passport');
const secret = require('../config/keys').passport;

const User = require('./User');

/*
    @route  GET users
    @desc   Retrieve the list of users
    @access Private
*/
router.get('/', passport.authenticate("jwt", { session: false }), (req, res) => {
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
    @desc   Retrieve a specific user
    @access Private 
*/
router.get('/:id', passport.authenticate("jwt", { session: false }), (req, res) => {
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
    @route  POST users
    @desc   Create a new user(register)
    @access Public
*/
router.post('/', (req, res) => {
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
    @route  PUT users/:id
    @desc   Edit a user's information by ID
    @access Private
*/
router.put('/:id', passport.authenticate("jwt", { session: false }), (req, res) => {
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
router.delete('/user/:id', passport.authenticate("jwt", { session: false }), (req, res) => {
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
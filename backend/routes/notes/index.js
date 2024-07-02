const express = require("express");
const router = express.Router();
const { notes, createNote, deleteNote, editNote } = require('./controllers')
const verifyToken = require('../../middlerware/auth')

router.get('/notes', verifyToken, notes);
router.post('/create-note/:noteId?', verifyToken, createNote);
router.put('/delete-note/:noteId', verifyToken, deleteNote);

module.exports = router
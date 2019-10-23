const mongoose = require("mongoose");

// reference to schema constructor
const Schema = mongoose.Schema;

// creates new NoteSchema
const NoteSchema = new Schema({
    title: String,
    body: String
});

// creates model from ArticleSchema
const Note = mongoose.model("Note", NoteSchema)

// export Article to app.js
module.exports = Note;
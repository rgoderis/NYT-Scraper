const mongoose = require("mongoose");

// reference to schema constructor
const Schema = mongoose.Schema;

// create new article schema
const ArticleSchema = new Schema({
    // set title to a string and required
    title: {
        type: String,
        unique: true
    },
    // set text to string and required
    text: {
        type: String,
    },
    // set url link to a string and required
    link: {
        type: String,
    },
    // set saved as boolean with default as false
    saved: {
        type: Boolean,
        default: false
    },
    // set notes to an array containing the ObjectId of Notes
    notes: [
        {
            type: Schema.Types.ObjectId,
            ref: "Note"
        }
    ] 
});

// creates model from ArticleSchema
const Article = mongoose.model("Article", ArticleSchema)

// export Article to app.js
module.exports = Article;
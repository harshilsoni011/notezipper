const mongoose = require("mongoose");
let notesModel = function () {
    const options = {
        collection: "notes",
        timestamps: {
            createdAt: "createdOn",
            updatedAt: "updatedOn",
        },
    };
    const NotesSchema = new mongoose.Schema({
        title: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
        category: {
            type: String,
            required: true
        },
        createdBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "users"
        }
    }, options)

    return mongoose.model("notes", NotesSchema);
};

module.exports = notesModel();
const notesModel = require('../../models/notes')
const { ObjectId } = require('mongoose').Types;

const controllers = {

    notes: async (req, res, next) => {
        try {
            const notes = await notesModel.find({ createdBy: new ObjectId(req.user._id) });
            return res.sendSuccess(notes);
        } catch (error) {
            console.log("🚀 ~ file: controllers.js:9 ~ notes: ~ error:", error)
            return res.sendSuccess("Error while fetching notes!!")
        }
    },

    createNote: async (req, res, next) => {
        try {
            const { noteId } = req.params;
            if (noteId && (typeof noteId === "string") && noteId != "undefined") {
                await notesModel.updateOne({ _id: noteId }, {
                    $set: {
                        ...req.body
                    }
                });
                return res.sendSuccess("New Note updated successfully")
            }
            await notesModel.create({ createdBy: new ObjectId(req.user._id), ...req.body });
            return res.sendSuccess("New Note created successfully")
        } catch (error) {
            console.log("🚀 ~ file: controllers.js:18 ~ createNote: ~ error:", error)
            return res.sendError("Failed to create new note")
        }
    },
    deleteNote: async (req, res, next) => {
        try {
            const { noteId } = req.params;
            await notesModel.deleteOne({ _id: noteId });
            return res.sendSuccess("Note Deleted successfully....")
        } catch (error) {
            console.log("🚀 ~ file: controllers.js:18 ~ createNote: ~ error:", error)
            return res.sendError("Failed to Delete note")
        }
    },
    // editNote: async (req, res, next) => {
    //     try {
    //         const { noteId } = req.params;
    //         const { title, content, category } = req.body;
    //         await notesModel.updateOne({ _id: noteId }, {
    //             $set: {
    //                 title: title, content: content, category: category
    //             }
    //         });
    //         return res.sendSuccess("Note Updated successfully....")
    //     } catch (error) {
    //         console.log("🚀 ~ file: controllers.js:18 ~ createNote: ~ error:", error)
    //         return sendError("Failed to Update note")
    //     }
    // }
};

module.exports = controllers
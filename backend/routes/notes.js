const express = require("express");
const { body, validationResult } = require("express-validator");

const router = express.Router();

const Notes = require("../models/Notes");
const fetchUser = require("../middleware/fetchuser");

// ROUTE 1 : Get loggedin User details using: GET "/api/notes/fetchallnotes". Login required
router.get("/fetchallnotes", fetchUser, async (req, res) => {
    try {
        const notes = await Notes.find({ user_id: req.user.id });
        res.json(notes);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// ROUTE 2 : Add a new Note using: POST "/api/notes/addnote". Login required
router.post(
    "/addnote",
    fetchUser,
    [
        body("title", "Title must be minimum of 5").isLength({ min: 5 }),
        body("description", "Description must be minimum of 5").isLength({
            min: 5,
        }),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { title, description, tag } = req.body;

            const note = new Notes({
                title,
                description,
                tag,
                user_id: req.user.id,
            });
            const savedNote = await note.save();

            res.json(savedNote);
        } catch (error) {
            console.log(error.message);
            res.status(500).json({ error: "Internal Server Error" });
        }
    }
);

// ROUTE 3 : Update  Note using: PUT "/api/notes/updatenote/:id". Login required
router.put('/updatenote/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;

    try {
        // Create a newNote object
        const newNote = {};
        if(title){
            newNote.title = title;
        };
        if(description) {
            newNote.description = description;
        };
        if(tag) {
            newNote.tag = tag;
        }

        // Find te note to be updated
        let note = await Notes.findById(req.params.id);
        if(!note) {
            return res.status(404).send("Note not found");
        }

        if(note.user_id.toString() !== req.user.id){
            return res.status(401).send("Unauthorized user");
        }

        note = await Notes.findByIdAndUpdate(req.params.id, {$set: newNote}, {new:true});
        return res.json(note);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
    
})

// ROUTE 4 : Delete  Note using: PUT "/api/notes/deletenote/:id". Login required
router.delete('/deletenote/:id', fetchUser, async (req, res) => {
    const { title, description, tag } = req.body;

    try {
            // Find te note to be deleted
            let note = await Notes.findById(req.params.id);
            if(!note) {
                return res.status(404).send("Note not found");
            }

            if(note.user_id.toString() !== req.user.id){
                return res.status(401).send("Unauthorized user");
            }

            note = await Notes.findByIdAndDelete(req.params.id);
            return res.status(201).send({message : "Successfully deleted"});
    } catch (error) {
        console.log(error.message);
        res.status(500).json({ error: "Internal Server Error" });
    }
})

module.exports = router;

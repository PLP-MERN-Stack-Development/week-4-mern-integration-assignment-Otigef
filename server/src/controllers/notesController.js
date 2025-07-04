import Note from "../models/Note.js"; // Assuming Note is a Mongoose model  

export async function getAllNotes(req, res) {
    try {
        const notes = await Note.find().sort({createdAt:-1}); // Assuming Note is a Mongoose model
        res.status(200).json(notes);

    } catch (error) {
        console.error("Error in getAllNotes controller", error);
        // send a 500 status code with an error message
        res.status(500).json({ message: "Internal server error"});
    }
}

export async function createNote(req, res) {
    try {
        const {title, content} = req.body; // Extracting title and content from the request body
        const Note = new Note({ title, content }); // Creating a new note instance
        const savedNote = await Note.save();
        res.status(201).json(savedNote); // Responding with a 201 status code and the created note
    } catch (error) {
        console.error("Error in createNote controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function updateNote(req, res) {
  try {
    const { title, content } = req.body;
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      {
        new: true,
      }
    );

    if (!updatedNote) return res.status(404).json({ message: "Note not found" });

    res.status(200).json(updatedNote);
  } catch (error) {
    console.error("Error in updateNote controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
} 

export async function deleteNote(req, res) {
    try {
        const deleteNote = await Note.findByIdAndDelete(req.params.id); // Deleting the note by ID
        if (!deletedNote) {
            return res.status(404).json({ message: "Note not found" }); // If no note is found, respond with 404
        }
        res.status(200).json({ message: "Note deleted successfully" }); // Responding with a success message
    } catch (error) {
        console.error("Error in deleteNote controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}   
import React, { useContext, useEffect, useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import NoteContext from "../context/notes/NoteContext";
import AddNote from "./AddNote";
import Noteitem from "./Noteitem";

export const Notes = (props) => {
  const context = useContext(NoteContext);
  const { notes, getNotes, editNote } = context;

  const [note, setNote] = useState({id: "", etitle: "", edesc: "", etag: ""});

  let history = useHistory();
  useEffect(() => {
    if(localStorage.getItem('token')) {
      getNotes();
    }
    else {
      history.push('/login');
    }
    // eslint-disable-next-line
  }, []);

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id: currentNote._id, etitle: currentNote.title, edesc: currentNote.description, etag: currentNote.tag});
  };

  const handleClick = (e) => {
    editNote(note.id, note.etitle, note.edesc, note.etag);
    refClose.current.click();
}

const onChange = (e) => {
    setNote({...note, [e.target.name] : e.target.value});
}

  const ref = useRef(null);
  const refClose = useRef(null);

  return (
    <>
      <AddNote />
      <button hidden ref={ref} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                  <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name='etitle' aria-describedby="title" minLength={5} required value={note.etitle} onChange={onChange}/>
                  </div>
                  <div className="mb-3">
                  <label htmlFor="edesc" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edesc" name='edesc' minLength={5} required value={note.edesc} onChange={onChange}/>
                  </div>
                  <div className="mb-3">
                  <label htmlFor="etag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name='etag' value={note.etag} onChange={onChange}/>
                  </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleClick}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className="container">
          {notes.length === 0 && "No notes to display"}
        </div>
        {notes.map((note) => {
          return (
            <Noteitem key={note._id} updateNote={updateNote} note={note} />
          );
        })}
      </div>
    </>
  );
};

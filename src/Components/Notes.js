import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../Context/notes/noteContext";
import Noteitem from "./Noteitem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";


const Notes = (props) => {
  const navigate = useNavigate();
  const {showAlert} = props;
  // console.log("Props in notes:", props); // Debugging props

  const Context = useContext(noteContext);
  const { notes, getNotes, editNote } = Context;

  useEffect(() => {
    if (localStorage.getItem('token')) {
      getNotes();  
    }
  else{
    navigate("/Login")
    return;
  }  
    // eslint-disable-next-line
  }, [navigate]);

  const ref = useRef(null);
  const refClose = useRef(null);
  const [note, setNote] = useState({
    _id: "",
    etitle: "",
    edescription: "",
    etag: "",
  });

  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({
      id: currentNote._id,
      etitle: currentNote.title,
      edescription: currentNote.description,
      etag: currentNote.tag,
    });
  };

  const handleSubmit = (e) => {
    editNote(note.id, note.etitle, note.edescription, note.etag);
    refClose.current.click();
    showAlert("Note updated Successfully", "success")
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <AddNote  showAlert={showAlert}/>

      <button
        type="button"
        className="btn btn-primary d-none"
        ref={ref}
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group my-3">
                  <label htmlFor="itle" className="h5">
                    Title
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    onChange={onChange}
                    placeholder="Title Here!"
                  />
                </div>
                <div className="form-group  ">
                  <label htmlFor="description" className="h5">
                    Description
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    id="edescription"
                    name="edescription"
                    value={note.edescription}
                    onChange={onChange}
                    placeholder="Description Here!"
                  />
                </div>
                <div className="form-group my-3 ">
                  <label htmlFor="tag" className="h5">
                    Tag
                  </label>
                  <input
                    type="Text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onChange}
                    placeholder="Tag Here!"
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                ref={refClose}
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="btn btn-primary"

              >
                Update note
              </button>
            </div>
          </div>
        </div>
      </div>

      <h2>Your Notes</h2>
      <div className="row">
        {notes.length > 0 ? (
          notes.map((note) => (
            <Noteitem key={note._id}   showAlert={showAlert}  updateNote={updateNote} note={note} />
          ))
        ) : (
          <p className="m-0">No notes to display
            <i className="bi bi-emoji-frown-fill ms-1 text-warning"></i>
          </p>
        )}
      </div>
    </div>
  );
};

export default Notes;

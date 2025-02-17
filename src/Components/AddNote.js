import React, { useContext, useState } from "react";
import noteContext from "../Context/notes/noteContext";

function AddNote(props) {
  const {showAlert} = props;
  // console.log("Props in addnotes:", props); // Debugging props
  const Context = useContext(noteContext);
  const { addNote } = Context;

  const [note, setNote] = useState({ title: "", description: "", tag: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: ""})
    showAlert("Note added Successfully", "success")
  };
  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <div>
      <div className="">
        <h3>Add Notes</h3>
        <form onSubmit={handleSubmit}>
          <div className="form-group my-3">
            <label htmlFor="title" className="h5">
              Title
            </label>
            <input
              type="Text"
              required minLength={3}
              className="form-control"
              id="title"
              name="title"
              value={note.title}
              onChange={onChange}
              placeholder="Title Here!"
            />
          </div>
          <div className="form-group  ">
            <label htmlFor="description" className="h5" required>
              Description
            </label>
            <input
              type="Text"
              required minLength={5}
              className="form-control"
              id="description"
              name="description"
              value={note.description}
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
              required minLength={3}
              className="form-control"
              id="tag"
              name="tag"
              value={note.tag}
              onChange={onChange}
              placeholder="Tag Here!"
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddNote;

import React, { useContext } from "react";
import noteContext from "../Context/notes/noteContext";

const Noteitem = (props) => {
  const {showAlert} = props;
  const Context = useContext(noteContext);
  const { deleteNote } = Context;
  const { note, updateNote } = props;
  return (
    <div className="col-md-3 my-2">
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{note.title}</h5>
          <p className="card-text">{note.description}</p>
          <i
            className="bi bi-trash mx-2"
            onClick={() => {
              deleteNote(note._id);
              showAlert("Note deleted successfully", "success");
            }}
          ></i>
          <i
            className="bi bi-pencil-square mx-2"
            onClick={() => {
              updateNote(note);
            }}
          ></i>
        </div>
      </div>
    </div>
  );
};

export default Noteitem;

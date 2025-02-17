import React from "react";
import noteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000";
  const notesInitial = [];
  const [notes, setNotes] = useState(notesInitial);


  //get all notes
  const getNotes = async () => {
    try {
      // API call
      const response = await fetch(`${host}/notes/fetchallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'auth-token': localStorage.getItem('token'),
        },
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const json = await response.json();
      setNotes(json);
    } catch (error) {
      console.error("Error fetching notes:", error.message);
    }
  };
  

  // Add a New Note
const addNote = async (title, description, tag) => {

  try {
    // API call
    const response = await fetch(`${host}/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag })
    });

    if (!response.ok) {
      throw new Error(`Error: ${response.status} - ${response.statusText}`);
    }

    const note = await response.json();
    setNotes((notes.concat(note)));
  } catch (error) {
    console.error("Failed to add note:", error.message);
  }
};

  // Delete Note
  const deleteNote = async (id) => {
    console.log("Attempting to delete note with ID:", id);

    try {
        const response = await fetch(`${host}/notes/deletenote/${id}`, {
            method: 'DELETE', 
            headers: {
                'Content-Type': 'application/json', 
                'auth-token': localStorage.getItem('token'),
            },
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error("Error response:", errorData);
            throw new Error(errorData.error || 'Failed to delete note');
        }

        console.log("Note successfully deleted with ID:", id);

        // Remove the deleted note from the notes state
        const newNotes = notes.filter((note) => note._id !== id);
        setNotes(newNotes);
    } catch (error) {
        console.error("Error deleting note:", error.message);
    }
};


    //Edit a Note
    const editNote = async (id, title, description, tag) => {
  try {
    // API call
    const response = await fetch(`${host}/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token'),
      },
      body: JSON.stringify({ title, description, tag }),
    });

    // Check if the response is successful
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);

    // Update the note locally
    let newNotes = JSON.parse(JSON.stringify(notes));

    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }

    setNotes(newNotes);
  } catch (error) {
    console.error("Error updating the note:", error.message);
  }
};


  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children} {/* Access children correctly */}
    </noteContext.Provider>
  );
};

export default NoteState;

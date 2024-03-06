// import { useState } from "react";

import { useState, useEffect } from "react";
import "./App.css";
import Notes from "./components/Notes";
import axios from "axios";
import noteService from "./services/notes"
import Notifications from "./components/Notifications";

const App = () => {
  const [notes, setNotes] = useState([]);
  const [errMessage, setErrMessage] = useState(null);
  useEffect(() => {
    noteService.getAll().then((response) => {
      console.log("promise fulfilled");
      setNotes(response.data);
 
    }).catch(error => {
              setErrMessage(
                `Note is not ready! see why ${error}`
              );
              setTimeout(() => {
                setErrMessage(null);
              }, 5000);
  })
  }, []);

  const [newNote, setNewNote] = useState();
  const [showAll, setShowAll] = useState(true);


  const addNote = (event) => {
    event.preventDefault();

    const noteSchem = {
      id: notes.length + 1,
      content: newNote,
      important: Math.random() < 0.5,
    };

    noteService.create(noteSchem).then((res) => {
      setNotes(notes.concat(noteSchem));
    });
    setNewNote("");
  };


  const handleNoteChange = (event) => {
    event.preventDefault();
    setNewNote(event.target.value);
  };



const toggleImportance = (id) => {
  const url = `http://localhost:3001/api/notes/${id}`;
  const note = notes.find((n) => n.id === id);
  const changedNote = { ...note, important: !note.important };

  noteService.update(id,changedNote).then((response) => {
    setNotes(notes.map((n) => (n.id !== id ? n : response.data)));
  
  });
};
  
  const notesToShow = showAll ? notes : notes.filter((note) => note.important);
  
    const handleDisplay = () => {
      setShowAll(!showAll);
    };

  return (
    <div>
      <h1>Notes Application</h1>
      <Notifications message={errMessage}></Notifications>
      <button onClick={()=>handleDisplay()}>
        {showAll ? "Only Important" : "Show All"}
      </button>
      <ul>
        {notesToShow.map((note) => 
  
            <Notes
            key={note.id}
            note={note}
            toggleImportance={() => toggleImportance(note.id)}
          ></Notes>

        )}
      </ul>

      <form onSubmit={addNote}>
        <input value={newNote} onChange={handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;

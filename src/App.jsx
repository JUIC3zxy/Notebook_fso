// import { useState } from "react";

import { useState,useEffect } from "react";
import "./App.css";
import Notes from "./components/Notes";
import axios from "axios";

const App = () => {

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:3001/notes").then((response) => {
      console.log("promise fulfilled");
      setNotes(response.data);
    });
  }, []);

  
  const [newNote, setNewNote] = useState(); 
  const [showAll,setShowAll]=useState(true)

  const addNote = (event) => {
    event.preventDefault();

    const noteSchem = {
      content: newNote,
      important: Math.random() < 0.5,
      id:notes.length+1
    }

    setNotes(notes.concat(noteSchem))
    setNewNote('')

  };

  const handleNoteChange = (event) => {
    event.preventDefault();
    setNewNote(event.target.value);
  }

  const handleDisplay = () => {
    setShowAll(!showAll)
  }

  return (
    <div>
      <h1>Notes Application</h1>
      <button onClick={handleDisplay}>{showAll?'Only Important':'Show All'}</button>
      <Notes notes={showAll? notes:notes.filter(note =>note.important===true)}></Notes>
      <form onSubmit={addNote}>
        <input value={newNote} onChange={ handleNoteChange} />
        <button type="submit">save</button>
      </form>
    </div>
  );
};

export default App;

import { useState } from "react";
const Notes = ({note,toggleImportance}) => {

  return (

    <li key={note.id}> {note.content} <button onClick={toggleImportance}>{note.important?'cancel':'mark'}</button></li>

  );
};
export default Notes;

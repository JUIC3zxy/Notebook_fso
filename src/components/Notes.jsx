import { useState } from "react";
const Notes = (props) => {

  return (
    <div>
      <ul>
        {props.notes.map((note) => {
          return <li key={note.id}>{note.content}</li>;
        })}
      </ul>
    </div>
  );
};
export default Notes;

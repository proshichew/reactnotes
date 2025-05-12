import { Note } from "./Interfaces/Note";

interface ReadOnlyNoteProps {
  note: Note;
  handleBeginRedactNote: (note: Note) => void;
  handleDeleteNote: (id: number) => void;
}

export const ReadOnlyNote: React.FC<ReadOnlyNoteProps> = ({ 
  note, 
  handleBeginRedactNote, 
  handleDeleteNote 
}) => {
  return (
    <>
      <div className="note-header">
        <h3 onClick={() => handleBeginRedactNote(note)}>{note.title}</h3>
      </div>
      <div className="note-content">
        <p>{note.content}</p>
      </div>
      <div className="note-footer">
        <small>{new Date(note.createdAt).toLocaleString()}</small>
        <button onClick={() => handleDeleteNote(note.id)}>Удалить</button>
      </div>
    </>
  );
};
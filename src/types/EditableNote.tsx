import {Note} from '../types/Interfaces/Note'; 

interface EditableNoteProps {
  note: Note;
  editedTitle: string;
  editedContent: string;
  setEditedTitle: (title: string) => void;
  setEditedContent: (content: string) => void;
  handleUpdateNote: (note: Note) => void;
  handleAbortRedactNote: () => void;
}

export const EditableNote: React.FC<EditableNoteProps> = ({ 
  note, 
  editedTitle, 
  editedContent, 
  setEditedTitle, 
  setEditedContent, 
  handleUpdateNote, 
  handleAbortRedactNote 
}) => {
  return (
    <>
      <textarea 
        className="note-header"
        value={editedTitle}
        onChange={(e) => setEditedTitle(e.target.value)}
      />
      <textarea 
        className="note-content"
        onChange={(e) => setEditedContent(e.target.value)}
        value={editedContent}
      />
      <div className="note-footer">
        <small>{new Date(note.createdAt).toLocaleString()}</small>
        <button onClick={handleAbortRedactNote}>Отмена</button>
        <button 
          onClick={() => handleUpdateNote({
            ...note,
            title: editedTitle,
            content: editedContent
          })}
        >
          Обновить
        </button>
      </div>
    </>
  );
};
import { useNotes } from '../hooks/useNotes';
import { EditableNote } from '../types/EditableNote';
import { ReadOnlyNote } from '../types/ReadOnlyNote';


const NotesComponent = () => {
  const {
    notes,
    isLoading,
    catchedError,
    newNote,
    redactingNote,
    editedContent,
    editedTitle,
    setNewNote,
    handleAddNote,
    handleDeleteNote,
    handleUpdateNote,
    setEditedContent,
    handleAbortRedactNote,
    handleBeginRedactNote,
    setEditedTitle
  } = useNotes();

  return (
    <div className="notes-app">
      <h1>Менеджер заметок</h1>
      
      <div className="add-note-form">
        <h2>Добавить заметку</h2>
        <input
          type="text"
          placeholder="Заголовок"
          value={newNote.title}
          onChange={(e) => setNewNote({...newNote, title: e.target.value})}
        />
        <textarea
          placeholder="Содержание"
          value={newNote.content}
          onChange={(e) => setNewNote({...newNote, content: e.target.value})}
        />
        <button onClick={handleAddNote}>Добавить</button>
        {catchedError && <div className="error">{catchedError}</div>}
      </div>

      



      <div className="notes-list">
        {isLoading && <div>Загрузка...</div>}
        {notes.map((note) => (
          <div key={note.id} className="note-card">
            {redactingNote && redactingNote.id === note.id ? (
              <EditableNote
                note={note}
                editedTitle={editedTitle}
                editedContent={editedContent}
                setEditedTitle={setEditedTitle}
                setEditedContent={setEditedContent}
                handleUpdateNote={handleUpdateNote}
                handleAbortRedactNote={handleAbortRedactNote}
              />
            ) : (
              <ReadOnlyNote
                note={note}
                handleBeginRedactNote={handleBeginRedactNote}
                handleDeleteNote={handleDeleteNote}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
  
export default NotesComponent;


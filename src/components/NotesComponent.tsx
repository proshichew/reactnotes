import { useNotes } from '../hooks/useNotes';

const NotesComponent = () => {
    const {
      notes,
      isLoading,
      catchedError,
      newNote, // сомневаюсь что хорошей идеей было выносить прямо все в хук
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
        </div>
  
        {catchedError && <div className="error">{catchedError}</div>}
  
        {isLoading && <div>Загрузка...</div>}
  
        <div className="notes-list"> {/* note можно будет вывести в отдельный компонент, так же как и условно redactnote*/}
          {notes.map((note) => (
            <div key={note.id} className="note-card">

              {redactingNote && redactingNote.id === note.id ? (
              <>
              <textarea className="note-header"
              value={editedTitle}
              onChange={(e)=>setEditedTitle(e.target.value)}/>
                <h3 onClick = {()=>handleBeginRedactNote(note)}> {note.title} </h3>
              
              <textarea className="note-content"
              onChange={(e)=>setEditedContent(e.target.value)}
              value={editedContent}/>
              </>
              ):(
                <>
                  <div className="note-header">
                    <h3 onClick = {()=>handleBeginRedactNote(note)}> {note.title} </h3>
                  </div>
                  <div className="note-content">
                    <p>{note.content}</p>
                  </div>
                </>
              )}
              <div className="note-footer">
                <small>{new Date(note.createdAt).toLocaleString()}</small>
                {redactingNote && redactingNote.id === note.id ? (
                  <>
                  <button onClick={()=> handleAbortRedactNote()}>Отмена</button>
                  <button 
                  onClick={() => handleUpdateNote({
                    ...note,
                    title: `${editedTitle}`,
                    content: `${editedContent}`
                  })}
                >
                  Обновить
                </button>
                </>
                ):(
                <>
                <button onClick={() => handleDeleteNote(note.id)}>Удалить</button>

                </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
};
  
export default NotesComponent;


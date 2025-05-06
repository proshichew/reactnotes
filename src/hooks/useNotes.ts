import {NoteService, Note} from '../api/api';
import { useState, useEffect } from 'react';

export const useNotes = () => {
    
    const [notes, setNotes] = useState<Note[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>();
    const [catchedError, setCatchedError] = useState<string | null>();
    const [redactingNote, setRedactingNote] = useState<Note | null>();


    const [editedContent, setEditedContent] = useState<string>(""); // плохо, поменять и сделать отдельный интерфейс для этого
    const [editedTitle, setEditedTitle] = useState<string>("");

    const [newNote, setNewNote] = useState<Omit<Note, 'id' | 'createdAt'>>({ 
      title: '', 
      content: '' 
    });

      useEffect(() => {
        NoteService.initialize('https://localhost:56690');
      }, []);
    
      useEffect(() => {
        const fetchNotes = async () => {
          setIsLoading(true);
          try {
            const loadedNotes = await NoteService.getNotes();
            setNotes(loadedNotes);
          } catch (err) {
            setCatchedError('Не удалось загрузить заметки');
          } finally {
            setIsLoading(false);
          }
        };
    
        fetchNotes();
      }, []);


    const handleAddNote = async () => {

      if (!newNote.title.trim() || !newNote.content.trim()) {
        setCatchedError('Нужны и заголовок, и содержимое');
        return;
      }
      setIsLoading(true);
      try {
        const createdNote = await NoteService.addNote({
          ...newNote,
          createdAt: new Date()
        });
        setNotes([...notes, createdNote]);
        setNewNote({ title: '', content: '' });
        setCatchedError(null);
      }
      catch(err) {
        console.error(err)
      }
      finally {
        setIsLoading(false);
      }
    }

    const handleBeginRedactNote = async (note: Note) => { 
      setRedactingNote(note);
      setEditedContent(note.content);
      setEditedTitle(note.title);
    }

    const handleAbortRedactNote = async() => {
      setRedactingNote(null);
    }

    const handleDeleteNote = async (id: number) => {
      setIsLoading(true);
      try {
        await NoteService.deleteNote(id);
        setNotes(await NoteService.getNotes()); // потом поглядеть ещё, это точно не лучший способ
      } catch (error) {
        throw error;
      }
      finally{
        setIsLoading(false);
      }
    };

    const handleUpdateNote = async (updatedNote : Note) => { 
      setIsLoading(true)
      try { 
        await NoteService.updateNote(updatedNote);
        setNotes(await NoteService.getNotes()); // аналогично должен быть способ получать всё гарантировано поменянное без вот этого нооо не смотрел
      } catch (error) { 
        throw error;
      }
      finally {
        setIsLoading(false);
        setRedactingNote(null);
      }
    }


    
  
    return { notes, isLoading, catchedError, newNote, redactingNote,editedContent, editedTitle, setNewNote, handleAddNote, handleDeleteNote, handleUpdateNote, setEditedContent, 
      handleBeginRedactNote, handleAbortRedactNote, setRedactingNote, setEditedTitle
    };
  };
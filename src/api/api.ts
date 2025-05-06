import axios, { AxiosInstance, AxiosResponse } from 'axios';

export interface Note {
  id: number;
  title: string;
  content: string;
  createdAt: Date;
}

export class NoteService {
  private static axiosInstance: AxiosInstance;

public static initialize(baseURL: string) {
    NoteService.axiosInstance = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

public static async getNotes(): Promise<Note[]> {
    try {
      const response: AxiosResponse<Note[]> = await NoteService.axiosInstance.get('/api/notes');
      return response.data;
    } catch (error) {
      console.error('Error fetching notes:', error);
      throw error;
    }
  }

public static async addNote(note: Omit<Note, 'id'>): Promise<Note> {
    try {
      const response: AxiosResponse<Note> = await NoteService.axiosInstance.post('/api/notes', note);
      return response.data;
    } catch (error) {
      console.error('Error adding note:', error);
      throw error;
    }
  }

  public static async deleteNote(id: number): Promise<void> {
    try {
      await NoteService.axiosInstance.delete(`/api/notes/${id}`);
    } catch (error) {
      console.error('Error deleting note:', error);
      throw error;
    }
  }


  public static async updateNote(note: Note): Promise<Note> {
    try {
      const response: AxiosResponse<Note> = await NoteService.axiosInstance.put(
        `/api/notes/${note.id}`,
        note
      );
      return response.data;
    } catch (error) {
      console.error('Error updating note:', error);
      throw error;
    }
  }
}
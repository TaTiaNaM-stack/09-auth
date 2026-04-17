import axios from 'axios';
import type { Note, FetchNotesResponse } from '@/types/note';

const NEXT_PUBLIC_NOTEHUB_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

axios.defaults.baseURL = 'https://notehub-api.goit.study';
axios.defaults.headers.common['Authorization'] = `Bearer ${NEXT_PUBLIC_NOTEHUB_TOKEN}`;

export const fetchNotes = async (searchQuery: string, currentPage: number, tag: string): Promise<FetchNotesResponse> => {
    const response = await axios.get<FetchNotesResponse>('/notes', {
      params: {
        page: currentPage,
        perPage: 12,
        ...(searchQuery && { search: searchQuery }),
        ...(tag && tag !== "all" && { tag }),
      },
    }); 
      return response.data;
}

export const fetchNoteById = async (id: string): Promise<Note> => {
    const response = await axios.get<Note>(`/notes/${id}`);
    return response.data;
}

export const checkSession = async (): Promise<boolean> => {
    try {
        await axios.get('/auth/session');
        return true;
    } catch (error) {
        return false;
    }
}

export const getMe = async (): Promise<{ email: string; username: string; avatarUrl: string }> => {
    const response = await axios.get('/auth/me');
    return response.data;
}
import axios from 'axios';
import type { CreateNoteData, Note, FetchNotesResponse } from '@/types/note';
import type { User } from '@/types/user';

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

export const createNote = async (newTodo: CreateNoteData): Promise<Note> => {
    const response = await axios.post<Note>('/notes', newTodo);
    return response.data;
}

export const deleteNote = async (id: string): Promise<Note> => {
    const response = await axios.delete<Note>(`/notes/${id}`);
    return response.data;
}

export type RegisterRequest = {
  email: string;
  password: string;
  userName: string;
};

export const register = async (data: RegisterRequest) => {
    const response = await axios.post<User>('/auth/register', data);
    return response.data;
}

export type LoginRequest = {
  email: string;
  password: string;
};

export const login = async (data: LoginRequest) => {
    const response = await axios.post<User>('/auth/login', data);
    return response.data;
}

export const logout = async (): Promise<void> => {
    await axios.post('/auth/logout');
}

type CheckSessionRequest = {
  success: boolean;
};

export const checkSession = async () => {
    try {
        const response = await axios.get<CheckSessionRequest>('/auth/session');
        return response.data.success;
    } catch (error) {
        return false;
    }
}

export const getMe = async () => {
    const response = await axios.get<User>('/auth/me');
    return response.data;
}

export const updateMe = async (email: string, username: string, avatarUrl: string): Promise<void> => {
    await axios.put('/auth/me', { email, username, avatarUrl });
}
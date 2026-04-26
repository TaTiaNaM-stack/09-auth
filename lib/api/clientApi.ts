import axios from 'axios';
import type { CreateNoteData, Note, FetchNotesResponse } from '@/types/note';
import type { User } from '@/types/user';
import { nextServer } from './api';

export const fetchNotes = async (searchQuery: string, tag: string, currentPage: number): Promise<FetchNotesResponse> => {
    const response = await nextServer.get<FetchNotesResponse>('/notes', {
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
    const response = await nextServer.get<Note>(`/notes/${id}`);
    return response.data;
}

export const createNote = async (newTodo: CreateNoteData): Promise<Note> => {
    const response = await nextServer.post<Note>('/notes', newTodo);
    return response.data;
}

export const deleteNote = async (id: string): Promise<Note> => {
    const response = await nextServer.delete<Note>(`/notes/${id}`);
    return response.data;
}

export type RegisterRequest = {
    email: string;
    password: string;
    //   userName: string;
};

export const register = async (data: RegisterRequest): Promise<User> => {
    const response = await nextServer.post<User>('/auth/register', data);
    return response.data;
}

export type LoginRequest = {
    email: string;
    password: string;
};

export const login = async (data: LoginRequest): Promise<User> => {
    const response = await nextServer.post<User>('/auth/login', data);
    return response.data;
}

export const logout = async (): Promise<void> => {
    await nextServer.post('/auth/logout');
}

type CheckSessionRequest = {
    success: boolean;
};

export const checkSession = async (): Promise<boolean> => {
    try {
        const response = await nextServer.get<CheckSessionRequest>('/auth/session');
        return response.data.success;
    } catch (error) {
        return false;
    }
}

export const getMe = async (): Promise<User> => {
    const response = await nextServer.get<User>('/users/me');
    return response.data;
}

export const updateMe = async (data: { username: string }): Promise<User> => {
    const response = await nextServer.patch<User>('/users/me', data);
    return response.data;
}
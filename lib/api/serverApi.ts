import axios from 'axios';
import { cookies } from 'next/headers';
import { nextServer } from './api';
import type { Note, FetchNotesResponse } from '@/types/note';
import { User } from '@/types/user';

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

// export const checkSession = async (): Promise<boolean> => {
//     try {
//         await axios.get('/auth/session');
//         return true;
//     } catch (error) {
//         return false;
//     }
// }

export const getMe = async (): Promise<User> => {
     const cookieStore = await cookies();
    const response = await nextServer.get('/users/me', {
        headers: {
            Cookie: cookieStore.toString(),
        },
    });
    return response.data;
}

export const checkSession = async () => {
    const cookieStore = await cookies();
     try {
        const response = await axios.get('/auth/session', {
            headers: {
                Cookie: cookieStore.toString(),
            },
        });
        return response.data;
    } catch (error) {
        return false;
    }
};
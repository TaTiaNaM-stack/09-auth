import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://notehub-api.goit.study',
  withCredentials: true,
});

export class ApiError extends Error {
  statusCode: number;
  errorMessage: string;
  response?: { error: string };

  constructor(statusCode: number, errorMessage: string) {
    super(`API Error: ${statusCode} - ${errorMessage}`);
    this.statusCode = statusCode;
    this.errorMessage = errorMessage;
  }
}
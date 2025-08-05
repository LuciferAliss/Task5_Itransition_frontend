import { apiClient } from "./apiClient";

export interface BookRequest {
  language: string;
  seed: number;
  page: number;
  pageSize: number;
  likes: number;
  reviews: number;
}

export interface BookResponse {
  isbn: string;
  title: string;
  author: string;
  publisher: string;
  reviews: string[];
  likes: number;
}

interface CsvRequest {
    books: BookResponse[];
}

export const bookApi = {
  fetchBooks: async (params: BookRequest): Promise<BookResponse[]> => {
    try {
      const response = await apiClient.get('/book/get', { params });
      return response.data;
    } catch (error) {
      console.error("Error fetching books:", error);
      throw error;
    }
  },

  downloadCsv : async (request: CsvRequest): Promise<Blob> => {
    try {
      const response = await apiClient.post('/book/download-csv', request, { responseType: 'blob' });
      return response.data;
    } catch (error) {
        console.error("Error downloading CSV:", error);
        throw error;
    }
  }
}

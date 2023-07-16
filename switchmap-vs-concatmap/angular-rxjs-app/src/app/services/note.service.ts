import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  createNote(): Observable<{ id: number; content: string }> {
    // 5-digit
    const id = Math.floor(Math.random() * 90000) + 10000;
    return this.httpClient.post('http://localhost:3000/notes', {
      id,
      content: '',
    }) as Observable<{ id: number; content: string }>;
  }

  saveNote(id: number, content: string | null) {
    return this.httpClient.put(`http://localhost:3000/notes/${id}`, {
      content,
    });
  }

  getNote(id: number): Observable<{ id: number; content: string }> {
    return this.httpClient.get(
      `http://localhost:3000/notes/${id}`
    ) as Observable<{ id: number; content: string }>;
  }
  constructor(private httpClient: HttpClient) {}
}

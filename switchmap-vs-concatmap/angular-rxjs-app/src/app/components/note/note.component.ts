import { Component, OnInit } from '@angular/core';
import { Subject, concat } from 'rxjs';
import {
  concatMap,
  delay,
  map,
  startWith,
  switchMap,
  tap,
} from 'rxjs/operators';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent {
  private static readonly noteId: number = 2;
  note: string = '';

  saveEventStream$ = new Subject<{ id: number; content: string }>();
  constructor(private noteService: NoteService) {}

  note$ = this.noteService.getNote(NoteComponent.noteId);
  save$ = (id: number, content: string) =>
    this.noteService.saveNote(id, content);

  savedNote$ = this.saveEventStream$.pipe(
    switchMap(({ id, content }) => this.save$(id, content)),
    startWith(this.note$),
    switchMap(() => this.note$),
    map((n) => n.content),
    tap((c) => (this.note = c))
  ); // just use async pipe in the template and Angular's got your back!

  onSave() {
    this.saveEventStream$.next({
      id: NoteComponent.noteId,
      content: this.note,
    });
  }
}
// export class NoteComponent {
//   private static readonly noteId: number = 2;
//   note: string = "";
//   savedNote: string = "";

//   constructor(private noteService: NoteService) {
//     this.noteService
//       .getNote(NoteComponent.noteId)
//       .pipe(tap(({ content }) => (this.note = this.savedNote = content)));
//   }

//   onSave() {
//     this.noteService
//       .saveNote(NoteComponent.noteId, this.note)
//       .pipe(
//         concatMap(() => this.noteService.getNote(NoteComponent.noteId)),
//         tap(({ content }) => (this.savedNote = content))
//       )

//       .subscribe();
//   }
// }

import { Component } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';
import { NoteService } from 'src/app/services/note.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent {
  private static readonly noteId: number = 2;
  note: string = '';
  savedNote: string = '';

  constructor(private noteService: NoteService) {
    this.noteService
      .getNote(NoteComponent.noteId)
      .pipe(tap(({ content }) => (this.note = this.savedNote = content)));
  }

  onSave() {
    this.noteService
      .saveNote(NoteComponent.noteId, this.note)
      .pipe(
        switchMap(() => this.noteService.getNote(NoteComponent.noteId)),
        tap(({ content }) => (this.savedNote = content))
      )

      .subscribe();
  }
}

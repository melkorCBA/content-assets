import { Component } from '@angular/core';
import { SlowTyperService } from './services/slow-typer.service';
import {
  concatMap,
  first,
  reduce,
  scan,
  startWith,
  switchMap,
  tap,
} from 'rxjs/operators';
import { Observable, Subject } from 'rxjs';
import { NoteService } from './services/note.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  noteId = 2;
  title = 'angular-rxjs-app';
  //typer$ = this.slowTyperService.typeStream$;
  typer$ = new Subject<string | null>();
  paragrap$ = this.typer$.pipe(
    scan((acc, val) => this.accumulateTypings(acc, val))
  );
  save$ = this.paragrap$.pipe(
    switchMap((ch) => this.noteService.saveNote(this.noteId, ch))
  );

  note$ = this.noteService.getNote(this.noteId);
  savedNote$ = this.save$.pipe(
    startWith(this.note$),
    switchMap(() => this.note$)
  );

  constructor(private noteService: NoteService) {}

  onInput(event: any) {
    this.typer$.next(event.data);
  }

  private accumulateTypings(acc: string | null, val: string | null) {
    if (!acc) return val ?? '';
    if (!val) return '' + acc.substring(0, acc.length - 1) + '';
    return '' + acc + val;
  }
}

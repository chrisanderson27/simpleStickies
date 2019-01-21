import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Note } from './note';
import { NotesService } from './notes.service';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { MatMenuItem, MatMenu } from '@angular/material/menu';
// import 'rxjs/add/operator/map';
const batchSize = 20;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,

})


export class AppComponent implements OnInit {
  notes: any;
  @ViewChild(CdkVirtualScrollViewport)
  viewport: CdkVirtualScrollViewport;
  dummyNotes = [
    new Note('Note 1', 'note 1 body', '01-17-2019', 'incomplete', 'default'),
    new Note('Note 2', 'note 2 body', '01-17-2019', 'incomplete', 'default'),
    new Note('Note 3', 'note 3 body', '01-17-2019', 'incomplete', 'default'),
    new Note('Note 4', 'note 4 body', '01-17-2019', 'incomplete', 'default'),
    new Note('Note 5', 'note 5 body', '01-17-2019', 'incomplete', 'default'),
  ];
  snapshot;

  noteDoc: AngularFirestoreDocument<Note>;
  title = 'simpleStickies';
  theEnd = false;

  offset = new BehaviorSubject(null);

  notesCollection: AngularFirestoreCollection<Note>
  infinite: Observable<Note[]>;

  newContent = "";
  constructor(private service: NotesService, private db: AngularFirestore) {
    // this.viewport.scrollToIndex(23);

  }

  ngOnInit() {
    // this.notes = this.dummyNotes;
    this.notesCollection = this.db.collection('notes');
    this.notes = this.notesCollection.valueChanges();
    this.noteDoc = this.db.doc('notes/b6TGS262JTQXTIP36pDu');
    this.snapshot = this.notesCollection.snapshotChanges().subscribe(res => {
      this.snapshot = res;
      console.log(this.snapshot);
    });
    // console.log(':)')
    // console.log(this.noteDoc.valueChanges().subscribe(res => {
    //   console.log(res);
    // }));
  }

  scrolled($event) {

  }

  nextBatch(e, offset) {
    if (this.theEnd) {
      return;
    }

    const end = this.viewport.getRenderedRange().end;
    const total = this.viewport.getDataLength();

    if (end === total) {
      this.offset.next(offset);
    }
  }

  trackByIdx(i) {
    return i;
  }

  addNote() {
    let noteToAdd: Note = new Note("title here", this.newContent, Date.toString(), 'incomplete', 'yellow')
    this.notesCollection.add({ ...noteToAdd });
    this.notesCollection.get()
  }

  displayId(x) {
    console.log(x);
    let thisNotesId = this.snapshot[x].payload.doc.id;
    this.noteDoc = this.db.doc('notes/' + thisNotesId);

    //get and save the note
    let newNote: Note;
    this.notesCollection.doc(thisNotesId).get().subscribe(res => {
      newNote = res.data() as Note;
      console.log('!!!')
    });
    // thisNote
    // console.log('id = ' + thisNote.payload.doc.id)
  }

  changeColor(index, color) {
    // get noteRef at this id
    let id = this.snapshot[index].payload.doc.id;
    this.noteDoc = this.db.doc('notes/' + id);
    // subscribe to this note, cast it as a new one, and update it
    let newNote: Note;
    this.notesCollection.doc(id).get().subscribe(res => {
      newNote = res.data() as Note;
      newNote.color = color;
      this.noteDoc.set(newNote);
    });
  }
  deleteNote(index) {
    // get noteRef at this id
    let id = this.snapshot[index].payload.doc.id;
    this.notesCollection.doc(id).delete();
  }

  updateNote(index, note: Note ){
    console.log('inside updateNote');
    let id = this.snapshot[index].payload.doc.id;
    this.noteDoc = this.db.doc('notes/' + id);
    this.notesCollection.doc(id).get().subscribe(res => {
      this.noteDoc.set(note);
    });
  }

  // getColor(color) {
  //   switch (color) {
  //     case  :

  //       break;

  //     default:
  //       break;
  //   }
  // }

  // getBatch(lastSeen: string) {
  //   return this.db.collection('notes', ref =>
  //     ref.orderBy('title').startAfter(lastSeen).limit(batchSize)
  //   ).snapshotChanges().pipe(
  //     tap(arr =>)
  //   )
  // }

}

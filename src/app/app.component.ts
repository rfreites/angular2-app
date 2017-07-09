import { Component } from '@angular/core';
import {AngularFireDatabase, FirebaseListObservable} from 'angularfire2/database';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  /*
  my_notes = [
    {
      id: 1,
      title: 'Note 1',
      description: 'Description for note 1'
    },
    {
      id: 2,
      title: 'Note 2',
      description: 'Description for note 2'
    },
    {
      id: 3,
      title: 'Note 3',
      description: 'Description for note 3'
    },
    {
      id: 4,
      title: 'Note 4',
      description: 'Description for note 4'
    },
    {
      id: 5,
      title: 'Note 5',
      description: 'Description for note 5'
    },
    {
      id: 6,
      title: 'Note 6',
      description: 'Description for note 6'
    },
    {
      id: 7,
      title: 'Note 7',
      description: 'Description for note 7'
    }
  ];
  */

  show_form = false;
  editing = false;
  note = { id: null, title: null, description: null };
  my_notes: FirebaseListObservable<any[]>;

  constructor(public afdb: AngularFireDatabase) {
    this.getNotes()
        .subscribe(
            notas => {
              this.my_notes = notas;
            }
        );
  }

  getNotes(): FirebaseListObservable<any> {
    return this.afdb.list('notas');
  }

  addNote() {
    this.note = { id: null, title: null, description: null };
    this.editing = false;
    this.show_form = true;
  }

  cancel() {
    this.editing = false;
    this.show_form = false;
  }

  // delete() {
  //   var _self = this;
  //   this.my_notes.forEach(function (el, i) {
  //     if (el === _self.note) {
  //       _self.my_notes.splice(i, 1);
  //     }
  //   });
  //   this.show_form = false;
  //   this.note = { id: null, title: null, description: null };
  // }

  removeNote() {
    this.afdb.database.ref('notas/' + this.note.id).remove();
    this.show_form = false;
    this.note = { id: null, title: null, description: null };
  }


  createNote() {

    if (!this.editing) {
      this.note.id = Date.now();
    }
  /*
    if (this.editing) {
      var _self = this;
      this.my_notes.forEach(function (el, i) {
        if (el.id === _self.note.id) {
          _self.my_notes[i] = _self.note;
        }
      });
    } else {
      this.note.id = Date.now();
      this.my_notes.push(this.note);
      this.note = { id: null, title: null, description: null };
    }
    */
    this.afdb.database.ref('notas/' + this.note.id).set(this.note);
    this.note = { id: null, title: null, description: null };
    this.show_form = false;

  }

  viewNote(note) {
    this.editing = true;
    this.note = note;
    this.show_form = true;
  }

}

import {Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss']
})
export class NotesComponent implements OnInit {
  statusList: string[] = ['All', 'Active', 'Completed'];
  selectedTab : string;
  noteArray:Note[] = [{
    noteTitle:"Test1",
    noteStatus:"Active"
  },
  {
    noteTitle:"Test2",
    noteStatus:"Completed"
  },
  {
    noteTitle:"Test3",
    noteStatus:"Completed"
  }];
  displayArray:Note[] = [];

  noteForm: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(){
    this.selectedTab = this.statusList[0];
    this.noteForm = this.formBuilder.group({
      noteTitle: ['', [Validators.required]],
      noteStatus: ['', [Validators.required]]
    });

    this.noteArray.forEach(note=>{
      this.displayArray.push(note);
    })
  }

  onSubmitForm(): void {
   this.noteArray.push(this.noteForm.value);
   if(!this.statusList.includes(this.noteForm.value.noteStatus))
        this.statusList.push(this.noteForm.value.noteStatus)
   this.noteForm.reset();
  }

  tabClicked(tab){
    this.selectedTab = tab;
    this.displayArray = [];
    this.noteArray.forEach(note=>{
      if(note.noteStatus === this.selectedTab) this.displayArray.push(note);
      else if(this.selectedTab === "All") this.displayArray.push(note);
    })
  }

}

export interface Note {
  noteTitle: string;
  noteStatus: string
}

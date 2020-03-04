import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public fg: FormGroup;
  engName:string;
  statusType: string;
  Student: string = "Student";
  Scholar: string = "Scholar";
  Guest: string = "Guest";
  universityType: string;
  kku: string = "kku";
  other: string = "other";
  isPoster: Boolean = false;
  isMovie: Boolean = false;
  isCosplay: Boolean = false;
  isRov: Boolean = false;

  constructor(private fb: FormBuilder) {
    this.fg = this.fb.group({
      'nameTH': [null, Validators.required],
      'status': [this.statusType, Validators.required],
      'nameEN': this.engName,
      'affiliation': null,
      'faculty': null,
      'KKUStudentID': null,
      'registerPoster': this.isPoster,
      'posterTeam': null, 
      'registerMovie': this.isMovie,
      'movieTeam': null,
      'registerCosplay': this.isCosplay,
      'nickname':null,
      'refCharacter':null,
      'registerROV': this.isRov,
      'ROVTeam':null,
    });
  }

  async ngOnInit() { }

  submit() {
    console.log(this.fg.value)
  }
}

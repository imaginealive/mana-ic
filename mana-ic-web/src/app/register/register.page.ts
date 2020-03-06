import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { RegisterService } from '../services/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public fg: FormGroup;
  engName: string;
  statusType: string;
  Student: string = "Student";
  Scholar: string = "Scholar";
  Guest: string = "Guest";
  affiliationName: string;
  facultyName: string;
  kkuStudentID: string;
  kku: string = "kku";
  other: string = "other";
  isKKU: Boolean = false;
  isPoster: Boolean = false;
  isMovie: Boolean = false;
  isCosplay: Boolean = false;
  isRov: Boolean = false;

  constructor(private fb: FormBuilder, public registerSvc: RegisterService) {
    this.fg = this.fb.group({
      'nameTH': [null, Validators.required],
      'status': [this.statusType, Validators.required],
      'nameEN': this.engName,
      'affiliation': this.affiliationName,
      'faculty': this.facultyName,
      'KKUStudentID': this.kkuStudentID,
      'registerPoster': this.isPoster,
      'posterTeam': null,
      'registerMovie': this.isMovie,
      'movieTeam': null,
      'registerCosplay': this.isCosplay,
      'nickname': null,
      'refCharacter': null,
      'registerROV': this.isRov,
      'ROVTeam': null,
    });
  }

  async ngOnInit() { }

  statusCheck() {
      this.affiliationName = null;
      this.facultyName = null;
      this.kkuStudentID = null;
    }
  

  universityCheck(event) {
    if (event.target.value == this.kku) {
      this.isKKU = true;
      this.affiliationName = "มหาวิทยาลัยขอนแก่น";
    }
    else {
      this.isKKU = false;
      this.affiliationName = null;
      this.facultyName = null;
      this.kkuStudentID = null;
    }
  }



  submit() {
    if (this.fg.valid) {
      this.registerSvc.createRegister(this.fg.value).then(data => {
        console.log(data);
      }, error => {
        console.log(error);
      });
      ;
    }
  }

}

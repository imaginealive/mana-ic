import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public fg: FormGroup;
  statusType: string;
  Student: string = "Student";
  Scholar: string = "Scholar";
  Guest: string = "Guest";
  universityType: string;
  kku: string = "kku";
  other: string = "other";

  constructor(private fb: FormBuilder) {
    this.fg = this.fb.group({
      'nameTH': [null, Validators.required],
      'status': [this.statusType, Validators.required],
      'registerPoster': Boolean,
      'registerMovie': Boolean,
      'registerCosplay': Boolean,
      'registerROV': Boolean,
    });
  }

  async ngOnInit() { }

  submit() {
    console.log(this.fg.value)
  }
}

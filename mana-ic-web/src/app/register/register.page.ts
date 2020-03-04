import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  public fg: FormGroup;

  constructor(private fb: FormBuilder) {
    this.fg = this.fb.group({
      'nameTH': [null, Validators.required],
    });
  }

  async ngOnInit() {  }

  submit() {
    console.log(this.fg.value)
  }
}

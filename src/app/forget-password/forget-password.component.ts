import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css']
})
export class ForgetPasswordComponent implements OnInit {

  verifyUserForm:FormGroup;
  securityQuestion : string[] = [
    'What is your favourite actor?',
    'What is the name of the pet?',
    'What is your first school name?',
    'What is your favourite flower?'
  ];
  constructor(private fb:FormBuilder) { }

  ngOnInit() {
    this.verifyUserForm = this.fb.group({
      'email' : '',
      'question' : 'What is your favourite actor?',
      'answer' : ''
    })
  }

}

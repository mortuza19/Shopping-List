import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { UserDetail } from '../Models/signup-user.model';
import { DataStorageService } from '../shared/data-storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  userDetails : UserDetail;
  signupForm:FormGroup;
  securityQuestion : string[] = [
    'What is your favourite actor?',
    'What is the name of the pet?',
    'What is your first school name?',
    'What is your favourite flower?'
  ];
  constructor(
    private fb:FormBuilder,
    private dataStorageService:DataStorageService,
    private router:Router
    ) { }

  ngOnInit() {
    this.signupForm = this.fb.group({
      'name' : '',
      'email' : '',
      'password' : '',
      'cpassword' : '',
      'question' : 'What is your favourite actor?',
      'answer' : ''
    })
  }

  onSubmit(){
    this.userDetails = {
      name : this.signupForm.controls['name'].value,
      email : this.signupForm.controls['email'].value,
      password : this.signupForm.controls['password'].value,
      question : this.signupForm.controls['question'].value,
      answer : this.signupForm.controls['answer'].value
    }
    this.dataStorageService.storeUserDetail(this.userDetails);
    this.userDetails=null;
    this.router.navigate(['/confirmation']);
  }

}

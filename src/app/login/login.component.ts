import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router, Data } from '@angular/router';
import { DataStorageService } from '../shared/data-storage.service';
import { UserDetail } from '../Models/signup-user.model';
import { HttpHandler } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  userForm : FormGroup;
  allUser: UserDetail[];
  loginSuccessful:boolean = false;
  loginFailure:boolean = false;
  authenticating: boolean = false;
  timer ;
  constructor(private fb:FormBuilder,private router:Router,private dataStorageService:DataStorageService) { }

  ngOnInit() {
    this.userForm = this.fb.group({
      'name' : '',
      'password' : ''
    })
  }

  get name(){
    return this.userForm.controls['name'];
  }

  get password(){
    return this.userForm.controls['password'];
  }

  onSubmit(){
    this.authenticating = true;
    console.log('hi');
    this.dataStorageService.getUser()
    .subscribe(response=>{
      this.allUser = response;
      for (let index = 0; index < this.allUser.length; index++) {
        const element = this.allUser[index];
        if(element.name === this.name.value &&
          element.password === this.password.value){
            this.loginSuccessful = true;
            this.authenticating = false;
            console.log('hi');
            this.timer = setTimeout(()=>{
              this.router.navigate(['/dashboard']);
            },1000);
            break;
          }
      }
      this.authenticating = false;
      if(!this.loginSuccessful){
        this.loginFailure = true;
      }
    });
  }

}

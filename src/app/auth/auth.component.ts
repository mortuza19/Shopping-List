import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService, AuthResposeModel } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  isLoginMode : boolean = true;
  isLoading : boolean = false;
  Error : string = null;
  constructor(private authService:AuthService,private router:Router) { }

  ngOnInit() {
  }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form:NgForm){
    this.isLoading = true;
    let authObs : Observable<AuthResposeModel>; 
    if(form.invalid){
      return;
    }
    if(this.isLoginMode){
      authObs = this.authService.login(form.value.email,form.value.password);
    }
    else{
      authObs = this.authService.signup(form.value.email,form.value.password)
    }

    authObs.subscribe(resData=>{
      console.log('Response:',resData);
      this.isLoading = false;
      this.router.navigate(['/recipes']);
    },errorMessage=>{
      this.Error = errorMessage;
      this.isLoading = false;
    })
    form.reset();
  }

}

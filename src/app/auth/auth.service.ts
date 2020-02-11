import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';

import { UserModel } from './user.model';
import { environment } from '../../environments/environment';

export interface AuthResposeModel{
    kind?: string,
    idToken: string,
    email: string,
    refreshToken: string,
    expiresIn: string,
    localId: string,
    registered ?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new BehaviorSubject<UserModel>(null);
  private tokenTimeOutTimer : any;
  constructor(private http:HttpClient,private router:Router) { }

  signup(email:String,password:String){
    return this.http.post<AuthResposeModel>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key='+environment.firebaseApiKey,
      {
        email : email,
        password : password,
        returnSecureToken : true
      }

    ).
    pipe(
      catchError(this.handleError),
      tap( resData=>{
        this.handleAuthentication(
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn
        )
      })
    );
  }
  login(email:String,password:String){
    return this.http.post<AuthResposeModel>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key='+environment.firebaseApiKey,
      {
        email : email,
        password : password,
        returnSecureToken : true
      }
    )
    .pipe(
      catchError(this.handleError),
      tap( resData=>{
        this.handleAuthentication(
          resData.email,
          resData.localId,
          resData.idToken,
          +resData.expiresIn
        )
      })
    );
  }

  autoLogin(){
    const userData:{email : string,
      userId : string,
     _token : string,
      _tokenExpirationDate : Date
    } = JSON.parse(localStorage.getItem('userData'));

    if(!userData){
      return;
    }

    const loadedUser = new UserModel(userData.email,userData.userId,userData._token,new Date(userData._tokenExpirationDate));
    if(loadedUser.token){
      this.user.next(loadedUser);
      this.autoLogout(
        new Date(userData._tokenExpirationDate).getTime() - new Date().getTime()
      );
    }
  }

  logout(){
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if(this.tokenTimeOutTimer)
      clearTimeout(this.tokenTimeOutTimer);
  }

  autoLogout(expirationDuration : number){
    this.tokenTimeOutTimer = setTimeout(()=>this.logout(),expirationDuration);
  }

  private handleAuthentication(
    email:string,
    id : string,
    token : string,
    expiresIn : number
  ){
    const expirationDate = new Date(new Date().getTime() + (expiresIn*1000));
    const user = new UserModel(email,id,token,expirationDate);
    this.user.next(user);
    this.autoLogout(expiresIn*1000);
    localStorage.setItem('userData',JSON.stringify(user));
  }

  private handleError(errorRes : HttpErrorResponse){
    var errorMessage : string = 'An error occured!';
        if(!errorRes.error || !errorRes.error.error){
          return throwError(errorMessage);
        }
        switch (errorRes.error.error.message) {
          case 'EMAIL_EXISTS':
            errorMessage = 'This email exists already!';
            break;
          case 'EMAIL_NOT_FOUND':
            errorMessage = 'This email is not correct';
            break;
          case 'INVALID_PASSWORD':
            errorMessage = 'This password is not correct';
            break;
        } 
        return throwError(errorMessage);
  }

  
}

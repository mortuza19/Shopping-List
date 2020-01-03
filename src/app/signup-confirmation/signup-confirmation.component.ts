import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-confirmation',
  templateUrl: './signup-confirmation.component.html',
  styleUrls: ['./signup-confirmation.component.css']
})
export class SignupConfirmationComponent implements OnInit,OnDestroy {

  remainingTime : number = 5;
  pointer : boolean = false;
  thhh;
  constructor(private router:Router) { }

  ngOnInit() {
    this.thhh=setInterval(()=>{
      this.remainingTime = this.remainingTime - 1;
      if(this.remainingTime<0){
        this.router.navigate(['/login'])
      }
    },1000);
  }

  ngOnDestroy(){
    clearInterval(this.thhh);
  }

}

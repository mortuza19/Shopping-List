import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'shopping-list';
  date = new Date();

  time(){
    // setInterval(()=>{
    //   this.date = new Date();
    // },1000)
    return this.date;
  }
  
}

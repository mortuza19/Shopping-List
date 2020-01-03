import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-general-layout',
  templateUrl: './general-layout.component.html',
  styleUrls: ['./general-layout.component.css']
})
export class GeneralLayoutComponent implements OnInit {

  date = new Date();

  time(){
    // setInterval(()=>{
    //   this.date = new Date();
    // },1000)
    return this.date;
  }
  constructor() { }

  ngOnInit() {
  }

}

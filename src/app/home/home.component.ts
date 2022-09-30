import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private rout:Router) { }
  openApp(){
    this.rout.navigate(["/app"])
  }
  ngOnInit(): void {
  }

}

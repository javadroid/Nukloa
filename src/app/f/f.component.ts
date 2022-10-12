import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-f',
  templateUrl: './f.component.html',
  styleUrls: ['./f.component.css']
})
export class FComponent implements OnInit {


  constructor(private rout:Router) { }
  openApp(){
    this.rout.navigate(["/app"])
  }
  ngOnInit(): void {
  }

}

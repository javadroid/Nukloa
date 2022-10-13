import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  nft(){
    this.toastr.success("Coming Soon");
  }
  constructor(private rout:Router,private toastr: ToastrService) { }
  openApp(){
    this.rout.navigate(["/app"])
  }
  ngOnInit(): void {
  }

}

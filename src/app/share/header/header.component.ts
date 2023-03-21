import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


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

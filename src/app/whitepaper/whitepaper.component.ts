import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-whitepaper',
  templateUrl: './whitepaper.component.html',
  styleUrls: ['./whitepaper.component.css']
})
export class WhitepaperComponent implements OnInit {
  nft(){
    this.toastr.success("Coming Soon");
  }
 
  constructor(private rout:Router,private toastr: ToastrService) { }
  openApp(){
    this.rout.navigate(["/app"])
  }

  collapsed = true;
  toggleCollapsed(): void {
    this.collapsed = !this.collapsed;
  }
  ngOnInit(): void {
  }

}

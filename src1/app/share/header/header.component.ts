import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  loading_bar_inner = 0
  loading_bar_style = { width: this.loading_bar_inner + '%' }
  isollapse = true

  constructor(private rout:Router,private toastr: ToastrService) { }


  ngOnInit(): void {

  }
  openApp(){
    this.rout.navigate(["/app"])
  }

nft(){
    this.toastr.success("Coming Soon");
  }


}

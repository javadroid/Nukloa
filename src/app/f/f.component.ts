import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-f',
  templateUrl: './f.component.html',
  styleUrls: ['./f.component.css']
})
export class FComponent implements OnInit {
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

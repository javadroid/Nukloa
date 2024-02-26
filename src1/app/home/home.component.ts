import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Route, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import imagesLoaded from 'imagesloaded';
import AOS from 'aos';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  @ViewChild('bgvideo') myVideo: any;
  loading_bar_inner = 0
  loading_bar_style = { width: this.loading_bar_inner + '%' }
  isollapse = false
  nft(){
    this.toastr.success("Coming Soon");
  }
  constructor(private rout:Router,private toastr: ToastrService,private elementRef: ElementRef) { }
  openApp(){
    this.rout.navigate(["/app"])
  }
  ngOnInit(): void {
    // AOS.init({
    //   offset: 400,
    //   duration: 2000,
    // });
  }
  ngAfterViewInit() {
    AOS.init({
      offset: 400,
      duration: 2000,
    });
  }



}


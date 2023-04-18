import { Component, OnInit } from '@angular/core';
import AOS from 'aos';
@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  ngAfterViewInit() {
    AOS.init({
      offset: 400,
      duration: 2000,
    });
  }
}

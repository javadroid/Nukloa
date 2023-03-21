import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  allpostcount=2
  isAuthenticated=true
  isemailverfied=true
  isprofileSet=true
  username=''
  isloading=false
  constructor() { }

  ngOnInit(): void {
  }

  onLogout(){}

}

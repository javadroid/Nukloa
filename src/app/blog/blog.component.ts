import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../share/service.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {
  allPosts=[] as any[]
  featuredPost=[] as any[]
  MostRescentPost=[] as any[]
  constructor(private http:ServiceService) { }

  ngOnInit(): void {
  }

  // title: string;

  // caption: string;
// date
// min
  // minRead: number;

  // Image: string;
  // category
  // featuredPost
  // details: string;
  getAllPost(){
    this.http.find('blog').subscribe((e:any[])=>{
      this.allPosts=e
      this.featuredPost=e.filter(post=>post.featuredPost=== true)
      this.MostRescentPost=e.slice(0,2)
    })
  }


}

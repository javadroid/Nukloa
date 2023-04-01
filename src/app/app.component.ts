import imagesLoaded from 'imagesloaded';
import { Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import * as THREE from 'three';
import gsap from 'gsap'
// import '../css/three'

import { DOCUMENT } from '@angular/common';
import { faCoffee,  } from '@fortawesome/free-solid-svg-icons';
import { testing } from './css/three';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // encapsulation: ViewEncapsulation.None,
})
export class AppComponent  {

  constructor(@Inject(DOCUMENT) private document: Document) { }
  @ViewChild('threeBG',{static:false}) threeBG!:ElementRef
  loading_bar_inner = 0
  loading_bar_style = { width: this.loading_bar_inner + '%' }
  isollapse = false
  faCoffee = faCoffee;
  backgroudimage = ['5', '18', '42', '46', '49', '52', '57', '154', '33']
  ngOnInit(): void {

this.loading()
  }

  ngAfterViewInit(){
    testing(this.threeBG.nativeElement)
  }


  loading() {

    const interval = setInterval(() => {
      if (this.loading_bar_inner < 100) {
        this.loading_bar_inner++
        this.loading_bar_style = { width: this.loading_bar_inner + '%' }

      } else if (this.loading_bar_inner === 100) {
        clearInterval(interval)
        gsap.to(".loading_bar", {
          duration: 5,
          rotate: "90deg",
          left: "1000%",
        })
        gsap.to(".loading_text,.loading_counter", {
          duration: 1,
          opacity: 0,
        })
        gsap.to(".loading_box", {
          duration: 1,
          height: "500px",
          borderRadius: "50%",
          opacity: 0.5
        })
        gsap.to(".loading_svg", {
          duration: 10,
          display: "block",
          rotate: "360deg",
          opacity: 0.5
        })
        gsap.to(".loading_box", {
          delay: 2,
          border: "none",
        })
        imagesLoaded(document.querySelectorAll('img'), () => {

          gsap.to(".loading", {
            delay: 2,
            duration: 2,
            zIndex: -99,
            background: "transparent",
            opacity: 0.3

          })
          gsap.to(".loading_svg", {

            duration: 100,
            rotate: "360deg"
          })
          gsap.to(".hideOnLoad", {
            duration: 3,
            delay: 4,
            opacity: 1,

          })

          gsap.to(".headerPlay", {
            duration: 3,
            delay: 2,
            top: "0",
          })

          gsap.to(".socials", {
            duration: 3,
            delay: 3,
            bottom: "10rem",

          })
        })

      }

    }, 5)




  }



}

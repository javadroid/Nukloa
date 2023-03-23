import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import gsap from 'gsap'
@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PlayComponent implements OnInit {

  constructor() { }

  loading_bar_inner=0
  loading_bar_style={width:this.loading_bar_inner+'%'}
  isollapse=false
  ngOnInit(): void {
    this.loading()
  }
  uncollapse(){

    gsap.to(".header_left li .hideli",{
      display: 'block',
    })
    gsap.to(".header_left",{
      display: 'flex',
      alignItems: 'flex-start',
      flexDirection: 'column',

    })
    setTimeout(()=> {
      this.isollapse=true
    }, 1000);

  }

  collapse(){


    gsap.to(".header_left",{
      delay:1,
      flexDirection: 'row',
      alignItems: 'center',
    })
    gsap.to(".header_left li .hideli",{
      display: 'none',
    })
    setTimeout(()=> {
      this.isollapse=false
    }, 1000);
  }
  loading(){

    setInterval(() => {
      if(this.loading_bar_inner<100){
        this.loading_bar_inner++
        this.loading_bar_style={width:this.loading_bar_inner+'%'}

      }else{
         gsap.to(".loading_bar",{
      duration:5,
      rotate:"90deg",
      left:"1000%",
    })
    gsap.to(".loading_text,.loading_counter",{
      duration:1,
      opacity:0,
    })
    gsap.to(".loading_box",{
      duration:1,
      height:"500px",
      borderRadius:"50%"
    })
    gsap.to(".loading_svg",{
      duration:10,
      display:"block",
     rotate:"360deg"
    })
    gsap.to(".loading_box",{
    delay:2,
    border:"none",
    })

    gsap.to(".loading",{
      delay:2,
      duration:2,
      // zIndex:1
      background:"transparent",
      opacity:0.5

      })
      gsap.to(".loading_svg",{

        duration:100,
       rotate:"360deg"
      })
      }

    },20)


  }



}

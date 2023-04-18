import imagesLoaded from 'imagesloaded';
import { Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import * as THREE from 'three';
import gsap from 'gsap'
import { Configuration, OpenAIApi } from "openai";
import AOS from 'aos';
import { environment } from 'src/environments/environment.prod';
// import '../css/three'

import { DOCUMENT } from '@angular/common';
import { faCoffee, } from '@fortawesome/free-solid-svg-icons';
import { testing } from './css/three';

import { ServiceService } from './share/service.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // encapsulation: ViewEncapsulation.None,
})

export class AppComponent {

  constructor(private http:ServiceService,private elementRef: ElementRef) { }
  @ViewChild('threeBG', { static: false }) threeBG!: ElementRef
  @ViewChild('bgvideo') myVideo!: ElementRef;
  loading_bar_inner = 0
  loading_bar_style = { width: this.loading_bar_inner + '%' }
  isollapse = false
  loadingDone=false
  showChat = false
  faCoffee = faCoffee;
  chatInput = 'What is $NUD NUKLEON DECENTRALIZED ORBITAL'
  conversations = [] as any[]
  backgroudimage = ['5', '18', '42', '46', '49', '52', '57', '154', '33']
  createChatCompletion = [{ role: "assistant", content: 'Nukleon Decentralized Orbital (NUD) is a cryptocurrency project that aims to create a decentralized exchange platform for trading digital assets. The platform is built on the Ethereum blockchain and uses smart contracts to execute trades automatically without the need for intermediaries. NUD token is the native cryptocurrency of the platform and is used to pay for transaction fees and other services. The project aims to provide users with a secure and transparent platform for trading digital assets while maintaining their privacy and security.' },
  { role: "assistant", content: '$NUD is currently on presale and not trading' },
  { role: "assistant", content: '$NUD offical site is http://nukleon.io' }] as any[]
  ngOnInit(): void {

    this.loading()
    this.nukAIChat()
  }

  ngAfterViewInit() {
    testing(this.threeBG.nativeElement)
    AOS.init({
      offset: 400,
      duration: 2000,
    });
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
            // opacity: 0

          }).then(()=>{
            this.loadingDone=true
          })

          gsap.to(".routerTest", {
       display:"contents"

          })
          // .then(() => {
          //   gsap.to(".video_container", {
          //     duration: 2,
          //     delay:2,
          //     opacity:1,
          //   }).then(()=>{
          //   let c=1

          //   this.myVideo.nativeElement.addEventListener('ended', () => {
          //     console.log('Video finished playing');
          //     this.myVideo.nativeElement.controls = true
          //     this.myVideo.nativeElement.currentTime = 0
          //   });
          // // const inn=  setInterval(()=>{
          // //     // c+=0.5
          // //     // console.log(c)
          // //     // this.myVideo.nativeElement.play()
          // //     // if(c===8.5){
          // //     //   clearInterval(inn)
          // //     //   this.myVideo.nativeElement.currentTime = 8
          // //     //   this.myVideo.nativeElement.pause();
          // //     // }


          // //     //
          // //     // this.myVideo.nativeElement.pause();
          // //   },500)

          //   })

          // })


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
            duration: 1,
            delay: 1,
            top: "0",
          })

          gsap.to(".socials", {
            duration: 3,
            delay: 3,
            bottom: "2rem",

          })
          gsap.to(".live_chat-container", {
            duration: 3,
            delay: 3,
            opacity: 1

          })



        })

      }

    }, 5)


  }

  closeAi(){
 this.showChat=false;

    gsap.to(".", {
      duration: 1,

      opacity: 0

    })
  }

  openAi(){
    this.showChat=true;
    gsap.to(".showChat", {
      duration: 1,

      opacity: 1

    })
  }

  async nukAIChat() {

    const configuration = new Configuration({
      organization:'org-YystOv4jjFUdGewDH3p3yOOn',
      apiKey: 'sk-'+'rRXtUZMwRh33YQJorwtIT3'+'BlbkFJBNa8d77chxPCtl7VaWtS',
  });
  const openai = new OpenAIApi(configuration);
    const c = { role: "user", content: this.chatInput }
    this.createChatCompletion.push(c)
    const chat = { me: this.chatInput, res: '...', id: this.conversations.length + 1 }
    this.chatInput = ''
    this.conversations.push(chat)
    this.scrollToMyDiv()
    openai.createChatCompletion({
      model:'gpt-3.5-turbo',
      messages:this.createChatCompletion,
      n:1,
      temperature:0.6,
      max_tokens:1000,

    }).then( res=> {
      const response = res.data.choices[0].message?.content
      console.log("res", response)
      const chat = this.conversations.pop()
      this.conversations = this.conversations.filter(c => c.id !== chat.id)
      chat['res'] = response
      this.conversations.push(chat)
      const c = { role: "assistant", content: response }
      this.createChatCompletion.push(c)
      this.scrollToMyDiv()
    })


    //
  }

  scrollToMyDiv() {
    const element = this.elementRef.nativeElement.querySelector('#swss');
    const element2 = this.elementRef.nativeElement.querySelector('#sws');
    element.scrollIntoView({ behavior: 'smooth', block: 'end', inline: 'nearest' });

    element.scrollTop=element.scrollHeight-element.clientHeight

  }
}

import imagesLoaded from 'imagesloaded';
import { Component, ElementRef, Inject, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import * as THREE from 'three';
import gsap from 'gsap'
import { Configuration, OpenAIApi } from "openai";
import { environment } from 'src/environments/environment.prod';
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
  showChat=false
  faCoffee = faCoffee;
  chatInput=''
  conversations=[]as any[]
  backgroudimage = ['5', '18', '42', '46', '49', '52', '57', '154', '33']
  createChatCompletion=[]as any[]
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
            // opacity: 0

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

  async nukAIChat(){
    const configuration = new Configuration({
      organization: environment.openai.organization,
      apiKey: environment.openai.apiKey,
  });
  const openai = new OpenAIApi(configuration);
  const response = await openai.listEngines();
  const c={role:"user", content:this.chatInput}
    this.createChatCompletion.push(c)
    const chat={me:this.chatInput,res:'...',id:this.conversations.length+1}
    this.chatInput=''
    this.conversations.push(chat)
  openai.createChatCompletion({
    "model": "gpt-3.5-turbo",
    "messages": this.createChatCompletion,
    n:1,
    max_tokens:100,
    temperature:0.4,

  }).then(res=>{
    const response=res.data.choices[0].message?.content
    console.log("res",response)
    const chat=this.conversations.pop()
    this.conversations=this.conversations.filter(c=>c.id!==chat.id)
    chat['res']=response
    this.conversations.push(chat)
  })


    //
  }


}

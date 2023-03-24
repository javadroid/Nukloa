import imagesLoaded from 'imagesloaded';
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as THREE from 'three';
import gsap from 'gsap'

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrls: ['./play.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class PlayComponent implements OnInit {

  constructor() { }
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(70,window.innerWidth/window.innerHeight,0.1,1000)
   renderer = new THREE.WebGLRenderer( );
   mesh!:THREE.Mesh

   loading_bar_inner = 0
  loading_bar_style = { width: this.loading_bar_inner + '%' }
  isollapse = false

  backgroudimage = ['5', '18', '42', '46', '49', '52', '57', '154', '33']
  ngOnInit(): void {
    // this.loading()
    // this.changeBackground()

    if (true ) {

      // Initiate function or other initializations here
      this.workingWithThree()

    } else {



    }

  }

  workingWithThree(){

      this.renderer.setPixelRatio( window.devicePixelRatio );
      this.renderer.setSize( window.innerWidth, window.innerHeight );
      this.renderer.outputEncoding = THREE.sRGBEncoding;
      // this.renderer.setSize(window.innerWidth,window.innerHeight)
      document.body.appendChild(this.renderer.domElement)

      const geometry = new THREE.BoxGeometry()
      const material = new THREE.MeshBasicMaterial({color:0xff0000})
      const  mesh = new THREE.Mesh(geometry, material)
      this.mesh=mesh
      this.scene.add(mesh)
     this.camera.position.z = 5
     this.animate()


  }
  animate(){
    requestAnimationFrame(()=>this.animate)
    this.mesh.rotation.x += 0.1
    this.mesh.rotation.y += 0.1
    console.log( this.mesh)
    this.scene.add(this.mesh)
    this.renderer.render(this.scene, this.camera)

  }


  uncollapse() {

    gsap.to(".header_left li .hideli", {
      display: 'block',
    })
    gsap.to(".header_left", {
      display: 'flex',
      alignItems: 'flex-start',
      flexDirection: 'column',

    })
    setTimeout(() => {
      this.isollapse = true
    }, 1000);

  }

  collapse() {


    gsap.to(".header_left", {
      delay: 1,
      flexDirection: 'row',
      alignItems: 'center',
    })
    gsap.to(".header_left li .hideli", {
      display: 'none',
    })
    setTimeout(() => {
      this.isollapse = false
    }, 1000);
  }

  changeBackground() {
    setInterval(() => {
      imagesLoaded(document.querySelectorAll('img'), () => {
        const randomIndex = Math.floor(Math.random() * this.backgroudimage.length);
        const randomElement = this.backgroudimage[randomIndex];
        gsap.to(".landing", {

          backgroundImage: `url('../../assets/background/${randomElement}.jpg')`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          transition: 'backgroundImage 0.5s ease-in-out'
        })

      })
    }, 8000)
  }
  loading() {

   const interval= setInterval(() => {
      if (this.loading_bar_inner < 100) {
        this.loading_bar_inner++
        this.loading_bar_style = { width: this.loading_bar_inner + '%' }

      } else if(this.loading_bar_inner === 100) {
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
          borderRadius: "50%"
        })
        gsap.to(".loading_svg", {
          duration: 10,
          display: "block",
          rotate: "360deg"
        })
        gsap.to(".loading_box", {
          delay: 2,
          border: "none",
        })
        imagesLoaded(document.querySelectorAll('img'), () => {

          gsap.to(".loading", {
            delay: 2,
            duration: 2,
            zIndex: 1,
            background: "transparent",
            opacity: 0.5

          })
          gsap.to(".loading_svg", {

            duration: 100,
            rotate: "360deg"
          })

          gsap.to(".header", {
            duration:1,
            delay:2,
            top:"0",
          })
          const randomIndex = Math.floor(Math.random() * this.backgroudimage.length);
          const randomElement = this.backgroudimage[randomIndex];
          gsap.to(".landing", {

            backgroundImage: `url('../../assets/background/${randomElement}.jpg')`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            transition: 'backgroundImage 0.5s ease-in-out'
          })

        })

      }

    }, 5)




  }




}

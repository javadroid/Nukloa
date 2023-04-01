import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000)
const renderer = new THREE.WebGLRenderer({ antialias: true });
const loader = new THREE.TextureLoader()
const clock=new THREE.Clock();
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding;


export function testing(test: any,) {
  const containerDiv = test
  containerDiv.appendChild(renderer.domElement);

  //responsive

  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight);
  })
  const geometry = new THREE.PlaneGeometry(17,9,15,9);
  const material = new THREE.MeshBasicMaterial({
    color: '#000',

    map: loader.load('../../assets/background/213.png'),
    // wireframe: true,
  })
  const geometry1 = new THREE.BoxGeometry(3,3,3);
  const material1 = new THREE.MeshBasicMaterial({
    // color: '',
    map: loader.load('../../assets/img/NUKLEN1.jpg'),
     opacity: 0,
    // wireframe: true,
  })
  const mesh = new THREE.Mesh(geometry, material)
  const mesh1 = new THREE.Mesh(geometry1, material1)

  camera.position.z = 5
  camera.position.x = -2
  // camera.position.y = -10
  scene.add(mesh1)

  const geometryattributes=geometry.attributes['position']

  const count =geometryattributes.count
  // console.log(geometryattributes.getY())
  // animate()
  // function animate() {
  //   const time=clock.getElapsedTime()
  //   for (let i = 0; i < count; i++) {
  //     //@ts-ignore
  //     const x =geometryattributes.getX(i)!
  //     //@ts-ignore
  //     const y =geometryattributes.getY(i)!
  //       const anim1= 0.75* Math.sin(x*2+time*0.7)
  //       const anim2= 0.25* Math.sin(x+time*0.7)
  //       const anim3y= 0.1* Math.sin(y*15+time*0.7)
  //        //@ts-ignore
  //        geometryattributes.setZ(i,anim1+anim2+anim3y)
  //        geometry.computeVertexNormals()
  //       //  geometryattributes.needsUpdate=true

  //   }
  //   requestAnimationFrame(animate)
  //   // mesh.rotation.x = mesh.rotation.x + 0.01
  //   // mesh.rotation.y = mesh.rotation.x + 0.01

  //   renderer.render(scene, camera)
  // }

  nukAnimate()
  function nukAnimate() {
    requestAnimationFrame(nukAnimate)
    mesh1.rotation.y = mesh1.rotation.y + 0.01
    // mesh1.rotation.z = mesh1.rotation.z + 0.01
    console.log(mesh1)
    renderer.render(scene, camera)
  }
}



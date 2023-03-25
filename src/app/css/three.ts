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
  const backgroudimage = ['5', '18', '42', '46', '49', '52', '57', '154', '33']
  const material = new THREE.MeshBasicMaterial({
    color: '#091551',

    map: loader.load('../../assets/background/213.png'),
    // wireframe: true,
  })
  const mesh = new THREE.Mesh(geometry, material)

  scene.add(mesh)
  camera.position.z = 5

  const geometryattributes=geometry.attributes['position']

  const count =geometryattributes.count
  // console.log(geometryattributes.getY())
  animate()
  function animate() {
    const time=clock.getElapsedTime()
    for (let i = 0; i < count; i++) {
      //@ts-ignore
      const x =geometryattributes.getX(i)!
      //@ts-ignore
      const y =geometryattributes.getY(i)!
        const anim1= 0.75* Math.sin(x*2+time*0.7)
        const anim2= 0.25* Math.sin(x+time*0.7)
        const anim3y= 0.1* Math.sin(y*15+time*0.7)
         //@ts-ignore
         geometryattributes.setZ(i,anim1+anim2+anim3y)
         geometry.computeVertexNormals()
         geometryattributes.needsUpdate=true

    }
    requestAnimationFrame(animate)
    // mesh.rotation.x = mesh.rotation.x + 0.01
    // mesh.rotation.y = mesh.rotation.x + 0.01

    renderer.render(scene, camera)
  }
}



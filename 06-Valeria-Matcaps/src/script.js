import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import sources from './sources.js'

/**
 * Base
 */

var Resources = {};

Resources.sources = sources

Resources.items = {}
Resources.toLoad = Resources.sources.length
Resources.loaded = 0

// Resources.setLoaders()
// Resources.startLoading()


// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
const geometry = new THREE.BufferGeometry()
const geometry2 = new THREE.SphereGeometry(1, 64, 64, 0, Math.PI * 2)
const count = 50
const positionsArray = new Float32Array(count * 3 * 3)
for(let i = 0; i < count * 3 * 3; i++)
{
    positionsArray[i] = (Math.random() - 0.5) * 4
}
const positionsAttribute = new THREE.BufferAttribute(positionsArray, 3)
geometry.setAttribute('position', positionsAttribute)



const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })

const matcapMaterial = new THREE.MeshMatcapMaterial({
    map: null,
    color: new THREE.Color( 0xffffff )
})

const mesh = new THREE.Mesh(geometry2, matcapMaterial)
scene.add(mesh)



// 1. Agregar centro
var axisWidth = 0.1;
var axisLength = 10;
const cajaX = new THREE.Mesh(
    new THREE.BoxGeometry(axisLength, axisWidth, axisWidth, 1, 1, 1), 
    new THREE.MeshBasicMaterial({
        color: '#ff0000'
    }),
)
scene.add(cajaX)

const cajaY = new THREE.Mesh(
    new THREE.BoxGeometry(axisWidth, axisLength, axisWidth, 1, 1, 1), 
    new THREE.MeshBasicMaterial({
        color: '#00ff00'
    }),
)
scene.add(cajaY)

const cajaZ = new THREE.Mesh(
    new THREE.BoxGeometry(axisWidth, axisWidth, axisLength, 1, 1, 1), 
    new THREE.MeshBasicMaterial({
        color: '#0000ff'
    }),
)
scene.add(cajaZ)



// 2. Poner la camara donde la queremos (posicion)
// 3. Ajuster donde esta mirando la camara
// 4. Desactivar el OrbitControl
// 5. Scroll 




/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
var posicionZ = 3;
camera.position.z = posicionZ

scene.add(camera)

// Controls
// const controls = new OrbitControls(camera, canvas)
// controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    // controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()


function moverCamaraZ(data) {
    console.log(data.deltaY);
    let offset = 0;
    if (data.deltaY > 0) {
        offset += 1;
        // offset = offset + 1;
    } else if (data.deltaY < 0) {
        offset -= 1;
        // offset = offset - 1;
    }

    posicionZ += offset;
    camera.position.z = posicionZ;
}

window.addEventListener('wheel', moverCamaraZ);
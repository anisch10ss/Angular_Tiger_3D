import { Injectable, type ElementRef } from "@angular/core"
import * as THREE from "three"

@Injectable({
  providedIn: "root",
})
export class ThreeService {
  private scene!: THREE.Scene
  private camera!: THREE.PerspectiveCamera
  private renderer!: THREE.WebGLRenderer
  private tigerHead!: THREE.Mesh

  createScene(canvas: ElementRef<HTMLCanvasElement>): void {
    // Scene setup
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0x000000)

    // Camera setup
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
    this.camera.position.z = 5

    // Renderer setup
    this.renderer = new THREE.WebGLRenderer({ canvas: canvas.nativeElement, antialias: true })
    this.renderer.setSize(window.innerWidth, window.innerHeight)

    // Tiger head geometry (simplified as a box)
    const geometry = new THREE.BoxGeometry(2, 2, 2)
    const material = new THREE.MeshPhongMaterial({ color: 0xffffff })
    this.tigerHead = new THREE.Mesh(geometry, material)
    this.scene.add(this.tigerHead)

    // Add some lighting
    const ambientLight = new THREE.AmbientLight(0x404040)
    this.scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5)
    directionalLight.position.set(1, 1, 1)
    this.scene.add(directionalLight)

    // Handle window resizing
    window.addEventListener("resize", () => this.onWindowResize(), false)
  }

  animate(): void {
    requestAnimationFrame(() => this.animate())

    // Rotate the tiger head
    this.tigerHead.rotation.x += 0.01
    this.tigerHead.rotation.y += 0.01

    // Animate RGB colors
    const time = Date.now() * 0.001
    const r = Math.sin(time) * 0.5 + 0.5
    const g = Math.sin(time + 2) * 0.5 + 0.5
    const b = Math.sin(time + 4) * 0.5 + 0.5
    ;(this.tigerHead.material as THREE.MeshPhongMaterial).color.setRGB(r, g, b)

    this.renderer.render(this.scene, this.camera)
  }

  private onWindowResize(): void {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }
}


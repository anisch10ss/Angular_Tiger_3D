import { Component, type ElementRef, type OnInit, ViewChild } from "@angular/core"
import { ThreeService } from '../three.service';

@Component({
  selector: "app-tiger-head",
  template: "<canvas #rendererCanvas></canvas>",
  styles: [
    `
    canvas {
      width: 100%;
      height: 100vh;
      display: block;
    }
  `,
  ],
})
export class TigerHeadComponent implements OnInit {
  @ViewChild("rendererCanvas", { static: true })
  private rendererCanvas!: ElementRef<HTMLCanvasElement>

  constructor(private threeService: ThreeService) {}

  ngOnInit() {
    this.threeService.createScene(this.rendererCanvas)
    this.threeService.animate()
  }
}


import {Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {Image} from '../../models/image.type';

@Component({
  selector: 'app-face-image-view',
  templateUrl: './face-image-view.component.html',
  styleUrls: ['./face-image-view.component.css']
})
export class FaceImageViewComponent implements OnInit, OnChanges {

  @Input() image: Image;
  @Input() currentFaceIndex: number;

  @ViewChild('canvas', {static: true})
  canvas: ElementRef<HTMLCanvasElement>;
  private context: CanvasRenderingContext2D;

  constructor() {
  }

  // Initialize the canvas context
  ngOnInit(): void {
    this.context = this.canvas.nativeElement.getContext('2d');
  }

  // If either of the inputs was changed redraw
  ngOnChanges(): void {
    if (this.image) {
      this.drawImage();
    }
  }

  // Preload the image and set canvas size to image size then draw the image
  // If there are rectangles draw them as well
  private drawImage() {
    const img = new Image();
    img.src = this.image.url;
    img.onload = () => {
      this.canvas.nativeElement.width = img.width;
      this.canvas.nativeElement.height = img.height;
      this.context.drawImage(img, 0, 0);
      if (this.image.faces.length > 0) {
        this.drawRectangle();
      }
    };
  }

  // Draw face rectangles, active with yellow the others with blue
  private drawRectangle() {
    this.context.lineWidth = 15;
    this.image.faces.map((it, index) => {
      const faceRect = it.faceRectangle;
      if (index === this.currentFaceIndex) {
        this.context.strokeStyle = '#f4db33';
      } else {
        this.context.strokeStyle = '#21b6d8';
      }
      this.context.strokeRect(faceRect.left, faceRect.top, faceRect.width, faceRect.height);
    });
  }


}

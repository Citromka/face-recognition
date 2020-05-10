import {Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {ImageService} from '../../services/image.service';
import {Image} from '../../models/image.type';
import {MatStepper} from '@angular/material/stepper';

@Component({
  selector: 'app-result-step',
  templateUrl: './result-step.component.html',
  styleUrls: ['./result-step.component.css']
})
export class ResultStepComponent implements OnChanges {

  @Input() active: boolean;

  private sample = [{
    faceId: 'dacf0dcd-135b-41ec-b5d7-648acd241571',
    faceRectangle: {top: 228, left: 130, width: 448, height: 461},
    faceAttributes: {
      smile: 0.0,
      headPose: {pitch: -0.3, roll: -1.1, yaw: 13.0},
      gender: 'male',
      age: 65.0,
      facialHair: {moustache: 0.1, beard: 0.1, sideburns: 0.1},
      glasses: 'ReadingGlasses',
      emotion: {
        anger: 0.008,
        contempt: 0.002,
        disgust: 0.0,
        fear: 0.0,
        happiness: 0.0,
        neutral: 0.989,
        sadness: 0.001,
        surprise: 0.0
      },
      blur: {blurLevel: 'high', value: 1.0},
      exposure: {exposureLevel: 'goodExposure', value: 0.4},
      noise: {noiseLevel: 'high', value: 1.0},
      makeup: {eyeMakeup: false, lipMakeup: false},
      accessories: [{type: 'glasses', confidence: 0.93}],
      occlusion: {foreheadOccluded: false, eyeOccluded: false, mouthOccluded: false},
      hair: {
        bald: 0.02,
        invisible: false,
        hairColor: [{color: 'black', confidence: 0.97}, {color: 'gray', confidence: 0.94}, {
          color: 'brown',
          confidence: 0.66
        }, {color: 'other', confidence: 0.32}, {color: 'blond', confidence: 0.15}, {color: 'red', confidence: 0.01}]
      }
    }
  }];

  current: Image;
  currentFaceIndex: number = 0;

  @ViewChild('canvas', { static : true })
  canvas: ElementRef<HTMLCanvasElement>;
  private context: CanvasRenderingContext2D;

  constructor(private imageService: ImageService) {
  }

  ngOnChanges(): void {
    if (this.active) {
      this.context = this.canvas.nativeElement.getContext('2d');
      this.imageService.getLast().subscribe((data: Image) => {
        this.current = data;
        this.drawImage();
      });
    }
  }

  private drawImage() {
    const img = new Image();
    img.src = this.current.url;
    img.onload = () => {
      this.canvas.nativeElement.width = img.width;
      this.canvas.nativeElement.height = img.height;
      this.context.drawImage(img, 0, 0);
      if (this.current.faces.length > 0) {
        this.drawRectangle();
      }
    };
  }

  private drawRectangle() {

    this.context.lineWidth = 15;
    this.current.faces.map((it, index) => {
      const faceRect = it.faceRectangle;
      if (index === this.currentFaceIndex) {
        this.context.strokeStyle = '#f4db33';
      } else {
        this.context.strokeStyle = '#21b6d8';
      }
      this.context.strokeRect(faceRect.left, faceRect.top, faceRect.width, faceRect.height);
    });
  }

  faceChanged(direction: number) {
    this.currentFaceIndex = (this.currentFaceIndex + direction) % this.current.faces.length;
    this.drawImage();
  }
}

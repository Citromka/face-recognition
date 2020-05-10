import {Component, DoCheck, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {ImageService} from '../../services/image.service';
import {Image} from '../../models/image.type';

@Component({
  selector: 'app-view-page',
  templateUrl: './view-page.component.html',
  styleUrls: ['./view-page.component.css']
})
export class ViewPageComponent implements OnInit, OnChanges {
  @Input() changed: boolean;

  constructor(private imageService: ImageService) {
  }

  @ViewChild('canvas', {static: true})
  canvas: ElementRef<HTMLCanvasElement>;
  private context: CanvasRenderingContext2D;
  images: Image[];
  currentPictureIndex = 0;
  private currentFaceIndex = 0;

  mappedProperties;
  displayedColumns = ['property', 'value'];

  ngOnInit(): void {
    this.context = this.canvas.nativeElement.getContext('2d');
    this.imageService.getAll().subscribe((data: Image[]) => {
      this.images = data;
      this.fillTable();
      this.drawImage();
    });
  }

  ngOnChanges(): void {
    if (this.changed) {
      this.imageService.getAll().subscribe((data: Image[]) => {
        this.images = data;
        this.drawImage();
      });
    }
  }

  private drawImage() {
    const img = new Image();
    img.src = this.images[this.currentPictureIndex].url;
    img.onload = () => {
      this.canvas.nativeElement.width = img.width;
      this.canvas.nativeElement.height = img.height;
      this.context.drawImage(img, 0, 0);
      if (this.images[this.currentPictureIndex].faces.length > 0) {
        this.drawRectangle();
      }
    };
  }

  private drawRectangle() {

    this.context.lineWidth = 15;
    this.images[this.currentPictureIndex].faces.map((it, index) => {
      const faceRect = it.faceRectangle;
      if (index === this.currentFaceIndex) {
        this.context.strokeStyle = '#f4db33';
      } else {
        this.context.strokeStyle = '#21b6d8';
      }
      this.context.strokeRect(faceRect.left, faceRect.top, faceRect.width, faceRect.height);
    });
  }

  private fillTable() {
    if (this.images[this.currentPictureIndex].faces.length > 0) {
      const {gender, age, hair, emotion, glasses} = this.images[this.currentPictureIndex].faces[this.currentFaceIndex];
      this.mappedProperties = [
        {name: 'gender', value: gender},
        {name: 'age', value: age},
        {name: 'hair', value: hair},
        {name: 'emotion', value: emotion},
        {name: 'glasses', value: glasses}
      ];
    } else {
      this.mappedProperties = [{name: 'error', value: 'no faces detected :('}];
    }
  }

  pictureChanged(direction: number) {
    this.currentPictureIndex = (this.currentPictureIndex + direction) % this.images.length;
    this.currentFaceIndex = 0;
    this.drawImage();
    this.fillTable();
  }

  faceChanged(direction: number) {
    this.currentFaceIndex = (this.currentFaceIndex + direction) % this.images[this.currentPictureIndex].faces.length;
    this.drawImage();
    this.fillTable();
  }

}

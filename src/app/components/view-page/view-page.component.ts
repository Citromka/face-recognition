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
  currentFaceIndex = 0;

  ngOnInit(): void {
    // this.context = this.canvas.nativeElement.getContext('2d');
    this.imageService.getAll().subscribe((data: Image[]) => {
      this.images = data;
      // this.drawImage();
    });
  }

  ngOnChanges(): void {
    if (this.changed) {
      this.imageService.getAll().subscribe((data: Image[]) => {
        this.images = data;
        // this.drawImage();
      });
    }
  }

  pictureChanged(direction: number) {
    this.currentPictureIndex = (this.currentPictureIndex + direction) % this.images.length;
    this.currentFaceIndex = 0;
    // this.drawImage();
  }

  faceChanged(direction: number) {
    this.currentFaceIndex = (this.currentFaceIndex + direction) % this.images[this.currentPictureIndex].faces.length;
    // this.drawImage();
  }

}

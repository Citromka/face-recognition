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

  images: Image[];
  currentPictureIndex = 0;
  currentFaceIndex = 0;

  ngOnInit(): void {
    this.imageService.getAll().subscribe((data: Image[]) => {
      this.images = data;
    });
  }

  ngOnChanges(): void {
    if (this.changed) {
      this.imageService.getAll().subscribe((data: Image[]) => {
        this.images = data;
      });
    }
  }

  pictureChanged(direction: number) {
    const step = this.currentPictureIndex + direction < 0 ? this.images.length + direction : this.currentPictureIndex + direction;
    this.currentPictureIndex = (step) % this.images.length;
    this.currentFaceIndex = 0;
  }

  faceChanged(direction: number) {
    const step =  (this.currentFaceIndex + direction) < 0 ?
                  (this.images[this.currentPictureIndex].faces.length + direction) :
                  (this.currentFaceIndex + direction);
    this.currentFaceIndex = (step) % this.images[this.currentPictureIndex].faces.length;
  }

}

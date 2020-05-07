import {Injectable} from '@angular/core';
import {of} from 'rxjs';
import {Image} from '../models/image.type';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private images: Image[];

  constructor() {
    this.load();
  }

  getAll() {
    return of(this.images);
  }

  getLast() {
    return of(this.images[this.images.length - 1]);
  }

  getById(id: number) {
    return {
      ...this.images.find((element) => {
        return element.id === id;
      })
    };
  }

  private load() {
    this.images = JSON.parse(localStorage.getItem('images')) || [];
  }

  private save() {
    localStorage.setItem('images', JSON.stringify(this.images));
  }

  addOrUpdateImage(image: Image) {
    if (image.id) {

      const original = this.images.find((element) => {
        return element.id === image.id;
      });

      Object.assign(original, image);
    } else {

      const maxImage = this.images.map((element) => element.id).sort().reverse()[0];
      image.id = (maxImage || 0) + 1;
      this.images.push(image);
    }
    return this.save();
  }

}

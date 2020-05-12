import {Injectable} from '@angular/core';
import {Observable, of, timer} from 'rxjs';
import {Image} from '../models/image.type';

@Injectable({
  providedIn: 'root'
})
export class ImageService {

  private images: Image[];

  constructor() {
    this.load();
  }

  // Gets all of the images as an Observable list
  getAll() {
    return of(this.images);
  }

  // Gets the last image that was added to the array as an Observable
  getLast() {
    return of(this.images[this.images.length - 1]);
  }

  // Returns the image of the given id as an Observable
  getById(id: number) {
    return {
      ...this.images.find((element) => {
        return element.id === id;
      })
    };
  }

  // Load the images from the local storage and parse them
  private load() {
    this.images = JSON.parse(localStorage.getItem('images')) || [];
  }

  // Save the images array to the local storage
  private save() {
    localStorage.setItem('images', JSON.stringify(this.images));
    return timer(200);
  }

  // Add a new image to the array or update it if it already exists, then save them in the local storage
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

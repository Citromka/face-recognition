import {Component, Input, ViewChild} from '@angular/core';
import {FaceService} from '../../services/face.service';
import {Image} from '../../models/image.type';
import {ImageService} from '../../services/image.service';
import {MatStepper} from '@angular/material/stepper';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-upload-step',
  templateUrl: './upload-step.component.html',
  styleUrls: ['./upload-step.component.css']
})

export class UploadStepComponent {
  @Input() stepper: MatStepper;

  // Ez egy RFC-ből van, elvileg ez a hivatalos módszer az azonosításra
  // private validatorPattern = '^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?';
  private validatorPattern = '^(https?:\/\/).*';

  debugger;
  urlFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(this.validatorPattern)
  ]);

  waitingForResult = false;
  imageUrl = '';

  constructor(private faceService: FaceService, private imageService: ImageService) {
  }

  nextButtonHandler() {
    this.waitingForResult = true;
    const firstOfReverseSort = (array) => {
      return array.sort((a: [string, number], b: [string, number]) => {
        return b[1] - a[1];
      })[0][0];
    };

    const imageUrl = 'https://upload.wikimedia.org/wikipedia/hu/3/36/Tatay_S%C3%A1ndor_1982.jpg';
    this.faceService.recognize(imageUrl).subscribe((data: any) => {
      const {faceAttributes, faceRectangle} = data[0];
      const {gender, age, emotion, glasses, hair} = faceAttributes;
      const image: Image = {
        id: null,
        url: imageUrl,
        gender,
        age,
        emotion: firstOfReverseSort(Object.entries(emotion)),
        glasses,
        hair: hair.bald > 0.5 ? 'bald' : firstOfReverseSort(hair.hairColor.map((color) => {
          return [color.color, color.confidence];
        })),
        faceRectangle
      };

      this.imageService.addOrUpdateImage(image);

      this.waitingForResult = false;
      this.stepper.next();

    });
  }
}

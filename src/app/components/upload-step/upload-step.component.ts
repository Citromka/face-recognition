import {Component} from '@angular/core';
import {FaceService} from '../../services/face.service';
import {Image} from '../../models/image.type';
import {ImageService} from '../../services/image.service';

@Component({
  selector: 'app-upload-step',
  templateUrl: './upload-step.component.html',
  styleUrls: ['./upload-step.component.css']
})

export class UploadStepComponent {
  title = 'upload';

  /*
  urlFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('.*'),
  ]);
   */

  constructor(private faceService: FaceService, private imageService: ImageService) {
  }

  nextButtonHandler() {
    const firstOfReverseSort = (array) => {
      return array.sort((a: [string, number], b: [string, number]) => {
        return b[1] - a[1];
      })[0][0];
    };

    const imageUrl = 'https://upload.wikimedia.org/wikipedia/hu/3/36/Tatay_S%C3%A1ndor_1982.jpg';
    this.faceService.recognize(imageUrl).subscribe((data: any) => {
      const {gender, age, emotion, glasses, hair} = data[0].faceAttributes;
      const image: Image = {
        id: null,
        url: imageUrl,
        gender,
        age,
        emotion: firstOfReverseSort(Object.entries(emotion)),
        glasses,
        hair: hair.bald > 0.5 ? 'bald' : firstOfReverseSort(hair.hairColor.map((color) => {
          return [color.color, color.confidence];
        }))
      };

      this.imageService.addOrUpdateImage(image);
    });
  }
}

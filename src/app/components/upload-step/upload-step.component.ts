import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FaceService} from '../../services/face.service';
import {Image} from '../../models/image.type';
import {ImageService} from '../../services/image.service';
import {MatStepper} from '@angular/material/stepper';
import {FormControl, Validators} from '@angular/forms';
import {FilestackService} from '@filestack/angular';
import {Face} from '../../models/face.type';

@Component({
  selector: 'app-upload-step',
  templateUrl: './upload-step.component.html',
  styleUrls: ['./upload-step.component.css']
})

export class UploadStepComponent implements OnInit {
  @Input() stepper: MatStepper;

  // Ez egy RFC-ből van, elvileg ez a hivatalos módszer az azonosításra
  // private validatorPattern = '^(([^:/?#]+):)?(//([^/?#]*))?([^?#]*)(\\?([^#]*))?(#(.*))?';
  private validatorPattern = '^(https?:\/\/).*';

  urlFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(this.validatorPattern)
  ]);

  apikey: string;
  waitingForResult = false;
  imageUrl = '';
  fileToUpload: File = null;
  error: string = null;

  constructor(private faceService: FaceService,
              private imageService: ImageService,
              private filestackService: FilestackService) {
  }

  ngOnInit(): void {
    this.apikey = ''; // TODO add filestack api key here
    this.filestackService.init(this.apikey);
  }

  handleFileInput(files: FileList) {
    this.waitingForResult = true;
    this.fileToUpload = files.item(0);
    this.uploadFile();
  }

  uploadFile() {
    this.filestackService.upload(this.fileToUpload)
      .subscribe((res: any) => {
        this.imageUrl = res.url;
        this.waitingForResult = false;
      });
  }

  nextButtonHandler() {

    const imageUrl = this.imageUrl;

    this.waitingForResult = true;
    const firstOfReverseSort = (array) => {
      return array.sort((a: [string, number], b: [string, number]) => {
        return b[1] - a[1];
      })[0][0];
    };

    this.faceService.recognize(imageUrl).subscribe((data: any) => {

      const faces: Face[] = data.map((it) => {
        const {faceAttributes, faceRectangle} = it;
        const {gender, age, emotion, glasses, hair} = faceAttributes;
        return {
          gender,
          age,
          emotion: firstOfReverseSort(Object.entries(emotion)),
          glasses,
          hair: hair.bald > 0.5 ? 'bald' : firstOfReverseSort(hair.hairColor.map((color) => {
            return [color.color, color.confidence];
          })),
          faceRectangle
        };
      });

      const image: Image = {
        id: null,
        url: imageUrl,
        faces
      };

      this.imageService.addOrUpdateImage(image).subscribe(() => {
        this.waitingForResult = false;
        this.stepper.next();
      });
    },
      (error) => {
        this.error = error.error.error.message;
        this.waitingForResult = false;
      });
  }
}

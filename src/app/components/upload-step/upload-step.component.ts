import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FaceService} from '../../services/face.service';
import {Image} from '../../models/image.type';
import {ImageService} from '../../services/image.service';
import {MatStepper} from '@angular/material/stepper';
import {FormControl, Validators} from '@angular/forms';
import {FilestackService} from '@filestack/angular';

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
  onSuccess: any;
  onError: any;

  constructor(private faceService: FaceService,
              private imageService: ImageService,
              private filestackService: FilestackService) {
  }

  ngOnInit(): void {
    this.apikey = ''; // TODO add filestack api key here
    this.filestackService.init(this.apikey);
    /*
    this.onSuccess = (res) => console.log('###onSuccess', res);
    this.onError = (err) => console.log('###onErr', err);

     */
  }


  onUploadSuccess(res: object) {
    console.log('###uploadSuccess', res);
  }

  onUploadError(err: any) {
    console.log('###uploadError', err);
  }

  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
    this.uploadFile();
  }

  uploadFile() {
    this.filestackService.upload(this.fileToUpload)
      .subscribe((res: any) => this.imageUrl = res.url);
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

      this.imageService.addOrUpdateImage(image).subscribe(() => {
        this.waitingForResult = false;
        this.stepper.next();
      });
    });
  }
}

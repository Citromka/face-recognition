import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {Image} from '../../models/image.type';

@Component({
  selector: 'app-face-attributes',
  templateUrl: './face-attributes.component.html',
  styleUrls: ['./face-attributes.component.css']
})
export class FaceAttributesComponent implements OnChanges {

  @Input() current: Image;
  @Input() currentFaceIndex: number;

  mappedProperties;
  displayedColumns = ['property', 'value'];

  constructor() {
  }

  // If any of the inputs is changed refill the table that contains the attributes
  // If there are no faces then write a sad error message :(
  ngOnChanges(): void {
    if (this.current && this.current.faces.length > 0) {
      this.fillTable();
    } else {
      this.mappedProperties = [{name: 'error', value: 'no faces detected :('}];
    }
  }

  // Fill the table with the properties of the current face
  private fillTable() {
    const {gender, age, hair, emotion, glasses} = this.current.faces[this.currentFaceIndex];
    this.mappedProperties = [
      {name: 'gender', value: gender},
      {name: 'age', value: age},
      {name: 'hair', value: hair},
      {name: 'emotion', value: emotion},
      {name: 'glasses', value: glasses}
    ];
  }
}

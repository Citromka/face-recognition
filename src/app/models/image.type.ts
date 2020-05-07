import {Rectangle} from './rectangle.type';

export interface Image {
  id: number;
  url: string;
  gender: string;
  age: number;
  hair: string;
  emotion: string;
  glasses: string;
  faceRectangle: Rectangle;
}

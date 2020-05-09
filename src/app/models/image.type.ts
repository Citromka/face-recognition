import {Face} from './face.type';

export interface Image {
  id: number;
  url: string;
  faces: Face[];
}

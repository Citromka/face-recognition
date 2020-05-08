import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FaceService {

  private baseUrl = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect';
  private subscriptionKey = '007ee7f8ae2048f89d5dc5bac3d0889d'; // TODO add key here

  constructor(private http: HttpClient) {
  }

  recognize(url: string) {
    return this.http.post(this.baseUrl, {url}, {
      headers: {
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': this.subscriptionKey
      },
      observe: 'body',
      params: {
        returnFaceId: 'true',
        returnFaceLandmarks: 'false',
        returnFaceAttributes: 'age,gender,headPose,smile,facialHair,glasses,emotion,hair,makeup,occlusion,accessories,blur,exposure,noise'
      },
      reportProgress: false,
      responseType: 'json',
      withCredentials: false,
    });
  }
}

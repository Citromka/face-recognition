import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FaceService {

  private baseUrl = 'https://westcentralus.api.cognitive.microsoft.com/face/v1.0/detect';
  private subscriptionKey = ''; // TODO add face api key here

  constructor(private http: HttpClient) {
  }

  // Send a face recognition request to the MS Face API
  // Input url is the url of the image resource
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
        returnFaceAttributes: 'age,gender,smile,glasses,emotion,hair'
      },
      reportProgress: false,
      responseType: 'json',
      withCredentials: false,
    });
  }
}

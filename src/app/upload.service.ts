import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  private baseUrl : string = 'http://localhost:8080';
  constructor(private httpClient: HttpClient) { }
  upload(file: File): Observable<HttpEvent<any>> {
    const formData: FormData = new FormData();
    console.log("file: ", file);
    formData.append('file', file);
    console.log("formData: ", formData);
    const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.httpClient.request(req);
  }
  getFiles(): Observable<any> {
    return this.httpClient.get(`${this.baseUrl}/files`);
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseURL, Api } from '../path.config/Api';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CrudService {    

  constructor(private http:HttpClient) { }

  fileUpload(data:any) : Observable<any>{
    let url = BaseURL + Api.FilePost;
    return this.http.post(`${url}`, data);
  }

}
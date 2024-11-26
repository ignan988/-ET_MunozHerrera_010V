import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApidatosService {

  apiPost='https://jsonplaceholder.typicode.com/posts';

  constructor(private httpclient: HttpClient) { }

  
  getPosts():Observable<any>{
    return this.httpclient.get<any>(this.apiPost);
  }
  
}

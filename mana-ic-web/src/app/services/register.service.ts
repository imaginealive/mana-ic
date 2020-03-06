import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IRegisterService } from './iregister';

@Injectable({
  providedIn: 'root'
})
export class RegisterService implements IRegisterService {

  createRegister(data: any): Promise<any> {
    let apiUrl = "https://localhost:44314/api/serviceapi";
    return this.http.post(apiUrl, data).toPromise();
  }

  constructor(private http: HttpClient) { }
}

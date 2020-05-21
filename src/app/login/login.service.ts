
import {Injectable} from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

@Injectable()
export class LoginService {

  constructor( private http: Http,private router:Router) {
    
  }


}

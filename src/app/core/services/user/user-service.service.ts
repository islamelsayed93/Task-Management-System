import { Injectable } from '@angular/core';
import { User } from '../../models/user';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  private users = ['Islam', 'Yazan'];

  getUsers(): Observable<string[]> {
    return of(this.users);
  }
}

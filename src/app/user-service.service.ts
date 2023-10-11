import { Injectable, computed, effect, signal } from '@angular/core';
import { Md5 } from 'ts-md5';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import {DatePipe} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
   allUsers = signal<User[]>([]);

  username = signal('Hansi');
  password = signal('hansi');

  currentUser = computed(() => this.allUsers().find(x => x.name === this.username()));

  isUserKnown = computed(() => !!this.currentUser());
  isPasswordOk = computed(() => {
    const currentUser = this.currentUser();
    return currentUser?.passwordMd5 === Md5.hashStr(this.password());


  });
  isLoggedIn = computed(() => this.isUserKnown() && this.isPasswordOk());


  welcomeMessage2 = computed<string>(() => {
    if (!this.isLoggedIn()) return '';
    const key = `lastLoggedIn ${this.username()}`;
    const sLastLogin = localStorage.getItem(key);
    console.log('sLastLogin', sLastLogin);
    let message = `Welcome back ${this.currentUser()!.name}`;
    if (sLastLogin) {
      message += ` after ${sLastLogin}`;
    }
    localStorage.setItem(key, <string>this.datePipe.transform(new Date().getTime(), 'dd.MM.yyyy HH:mm:ss'));
    return message;
  });

  constructor(httpClient: HttpClient,public datePipe: DatePipe ) {
    httpClient.get<User[]>('./assets/users.json').subscribe((users) => {
      this.allUsers.set(users); // Set the value of allUsers signal
      console.log('Fetched Users:', users.map((x) => x.name));
      console.log(this.currentUser())
    });
  }
}


















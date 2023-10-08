import { Injectable, computed, signal } from '@angular/core';
import { Md5 } from 'ts-md5';
import { HttpClient } from '@angular/common/http';
import { User } from './user';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {
  private allUsers = signal<User[]>([]);

  username = signal('Hansi');
  password = signal('hansi');

  currentUser = computed(() => this.allUsers().find(x => x.name === this.username()));
  isUserKnown = computed(() => !!this.currentUser());


  //passwordHashed = computed(() => Md5.hashStr(this.password()));
  constructor(httpClient: HttpClient) {
    httpClient.get<User[]>("assets/persons.json").subscribe(x => this.allUsers.set(x));

  }

}














// //Note: password-hashes generated with https://www.md5hashgenerator.com/ passwordHashed = computed (() => Md5.hashStr(this.password())); currentUser = computed (() => this.allUsers ().singleOrDefault (x => x.name isUserKnown computed (() => !!this.currentUser());
// = this.username()));
// 20
// 21
// 22
// 23
// 24
// 25
// 26
// 27
// 28
// 29
// 30
// 31
// 32
// 33
// isPasswordok = computed (() => this.isUserKnown () && this.currentUser()!.passwordMd5= this.passwordHash isLoggedIn= computed (() => this.isUserKnown () && this.isPasswordok());
// welcomeMessage computed<string>(() => {
// if (!this.isLoggedIn ()) return '';
// const key = lastLoggedIn $(this.username());
// const sLast Login
// let message = '';
// if (sLastLogin) {
// }
// localStorage.getItem(key);
// const lastLoginTime = new Date().setTime (+sLastLogin);
// console.log('UserService computed welcomeMessage - lastLoginTime:', lastLoginTime); const timestamp = this.datePipe.transform (+lastLoginTime, 'dd.MM. yyyy HH:mm:ss'); message= Welcome back $(this.username()) after $(timestamp]";
// CLRICSAR
// Anglers-Mas
// ONLENDOWS
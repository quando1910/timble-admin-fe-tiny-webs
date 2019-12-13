
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class CommonService {

  breadcrumb$: BehaviorSubject<any>;
  user$: BehaviorSubject<any>;
  agencies$: BehaviorSubject<any>;


  constructor(
  ) {
    this.breadcrumb$ = new BehaviorSubject<any>(null);
    this.user$ = new BehaviorSubject<any>(null);
    this.agencies$ = new BehaviorSubject<any>(null);
  }

  setLocal(name: any, value: any) {
    name.forEach((nameLocal, index) => {
      typeof value[index] === 'string' ?
      localStorage.setItem(nameLocal, value[index]) :
      localStorage.setItem(nameLocal, JSON.stringify(value[index]));
    });
  }

  calcPhotographers(contracts) {
    return contracts.reduce((sum, x) => {
      const temp = Math.round(x.total_member / 20);
      return x.packages.filter(y => y.kind_package === 3).length > 0 ? sum + temp + 1 : sum + temp;
    }, 0);
  }

  removeLocal(name: any) {
    name.forEach(nameLocal => {
      localStorage.removeItem(nameLocal);
    });
  }


  getAdminRole() {
    return JSON.parse(localStorage.getItem('USER')).role;
  }

  changeBreadcrumb(value) {
    this.breadcrumb$.next(value);
  }

  setUser(data) {
    this.user$.next(data.user || null);
    this.agencies$.next(data.agencies || null);
  }

  getUser() {
    return this.user$.value;
  }
}

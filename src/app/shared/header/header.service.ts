import { Injectable } from '@angular/core';
import {BehaviorSubject, Subject} from "rxjs";

export type HeaderMenu =  'home' | 'training' | 'experience' | 'blog';

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  currentHeader: BehaviorSubject<string> = new BehaviorSubject('home');

  navigateTo(target: 'home' | 'training' | 'experience' | 'blog'): void {
    this.currentHeader.next(target);
  }
}

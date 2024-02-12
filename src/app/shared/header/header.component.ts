import {Component} from '@angular/core';
import asciidoctor from 'asciidoctor';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  html:string;

  constructor() {
    this.html = 'test'; //asciidoctor().convert('Hello, *world*!').toString();//
  }
}

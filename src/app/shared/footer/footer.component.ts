import { Component } from '@angular/core';
import {generationInstant} from "../../app.generation.instant";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  gendate = generationInstant;
}

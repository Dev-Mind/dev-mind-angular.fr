import {Component, OnDestroy} from '@angular/core';
import {RouterLink} from "@angular/router";
import {HeaderService} from "./header.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnDestroy {
  current: string =  'home';

  private subscription: Subscription;

  constructor(headerService: HeaderService) {
    this.subscription = headerService.currentHeader.subscribe(menu => this.current = menu);
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
}

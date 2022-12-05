import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AppRoutingService {
  constructor(private router: Router) {}
  goToLoginPage() {
    console.log('goToLoginPage');
    return this.router.navigateByUrl('/login');
  }

  goToHomePage() {
    console.log('goToHomePage');
    return this.router.navigateByUrl('/');
  }
}

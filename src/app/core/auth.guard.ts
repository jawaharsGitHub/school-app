import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { remult } from 'remult';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (remult.user) {
      console.log('User is authenticated:', remult.user);
      return true;
    }
    console.log('User is not authenticated, redirecting to login', remult.user);
    this.router.navigate(['/login']);
    return false;
  }
}

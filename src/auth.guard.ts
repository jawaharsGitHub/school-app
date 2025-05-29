import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { remult } from "remult";

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(): boolean {
    if (remult.user) return true;
    this.router.navigate(['/login']);
    return false;
  }
}

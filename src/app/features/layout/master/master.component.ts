import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { remult } from 'remult';
import { UserInfo } from '../../../../shared/entities/UserInfo'; // Adjust the path as necessary
import { retry } from 'rxjs';
import { SideNavComponent } from "../side-nav/side-nav.component";
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-master',
  standalone: true,
  imports: [RouterOutlet, RouterModule, HeaderComponent, SideNavComponent],
  templateUrl: './master.component.html',
  styleUrl: './master.component.css'
})
export class MasterComponent {

  
remult = remult; // Initialize Remult instance


constructor(private router: Router, private http: HttpClient) {
  // You can initialize any services or perform setup here if needed
}

 ngOnInit() {
     this.http
       .get<UserInfo>('api/currentUser')
       .pipe(retry(50))
       .subscribe((user) => {
         console.log('Current user master com:', user);
         this.remult.user = {
           id: String(user.id),
           name: user.firstName + ' ' + user.lastName,
           roles: ['admin'], // optional
         }; // Set the current user in Remult
         console.log('Current user456:', this.remult.user);
       });
   }

  logout() {
  this.remult.user = undefined;
  this.router.navigate(['/login']);
}

}

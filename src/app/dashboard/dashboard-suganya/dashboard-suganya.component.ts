import { Component } from '@angular/core';
import { InfoCardComponent } from '../info-card/info-card.component';

@Component({
  selector: 'app-dashboard-suganya',
  standalone: true,
   imports: [InfoCardComponent],  // Correct use of imports for standalone component
  templateUrl: './dashboard-suganya.component.html',
  styleUrl: './dashboard-suganya.component.css'
})
export class DashboardSuganyaComponent {

}

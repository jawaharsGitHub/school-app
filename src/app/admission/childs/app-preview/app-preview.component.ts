import {Component, input, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { UserProfile } from '../../../../shared/Models/UserModels';

@Component({
  selector: 'app-preview',
  standalone: true,
  imports: [],
  templateUrl: './app-preview.component.html',
  styleUrl: './app-preview.component.scss'
})
export class AppPreviewComponent { //  implements OnInit, OnChanges {
  imageURL=input.required<string>();
  //@Input({ required: true }) imageURL?: string;
  @Input() userProfile?: UserProfile;


    constructor() {
    console.log('AppPreviewComponent: Constructor called!'); // <-- Add this
  }

  // ngOnInit(): void {
  //   console.log('AppPreviewComponent: ngOnInit called!'); // <-- Add this
  //   console.log('AppPreviewComponent ngOnInit. Initial userProfile:', this.userProfile);
  // }

  // ngOnChanges(changes: SimpleChanges): void {
  //   console.log('AppPreviewComponent: ngOnChanges called!'); // <-- Should see this if inputs change
  //   if (changes['userProfile']) {
  //     console.log('  Previous userProfile:', changes['userProfile'].previousValue);
  //     console.log('  Current userProfile:', changes['userProfile'].currentValue);
  //   }
  //   // ... rest of ngOnChanges
  // }

  // Add any methods needed for display, like formatting dates
  formatDate(dateString: string | Date | null | undefined): string {
    if (!dateString) return 'N/A';
    const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
    if (isNaN(date.getTime())) return 'Invalid Date';
    return date.toLocaleDateString(); // Adjust format as needed
  }

  
}
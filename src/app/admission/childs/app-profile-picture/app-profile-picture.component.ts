import {
  Component,
  EventEmitter,
  input,
  OnInit,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import { UserProfile, Aviator } from '../../../../shared/Models/UserModels';
import { NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-picture',
  standalone: true,
  imports: [NgIf, FormsModule],
  templateUrl: './app-profile-picture.component.html',
  styleUrl: './app-profile-picture.component.scss',
})
export class AppProfilePictureComponent {
  profilePicture: WritableSignal<Aviator[]> = signal([]); // Signal holding an array of Aviator objects
  @Output() profilePictureChange = new EventEmitter<Aviator>();
  @Output() stepValidity = new EventEmitter<boolean>();
  
  onFileSelected(event: any): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      const imageObj: Aviator = {
        file: file,
        urlDisplay: URL.createObjectURL(file),
      };

      // Add the new object to the signal

      this.profilePicture.update((pictures) => [...pictures, imageObj]);
      this.profilePictureChange.emit(imageObj);
      this.stepValidity.emit(true);
    } else {
      this.stepValidity.emit(false);
    }
  }
}

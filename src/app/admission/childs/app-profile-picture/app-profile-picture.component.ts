import {
  Component,
  EventEmitter,
  Input,
  input,
  OnInit,
  Output,
  signal,
  WritableSignal,
} from '@angular/core';
import { UserProfile, Aviator } from '../../../../shared/Models/UserModels';
import { CommonModule, NgIf,  } from '@angular/common';
import { AbstractControl, FormBuilder, FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-profile-picture',
  standalone: true,
  imports: [NgIf, ReactiveFormsModule, CommonModule, FontAwesomeModule],
  templateUrl: './app-profile-picture.component.html',
  styleUrl: './app-profile-picture.component.css',
})
export class AppProfilePictureComponent implements OnInit {
  @Input() profilePictureForm!: FormGroup;
  
  profilePicture: WritableSignal<Aviator[]> = signal([]); // Signal holding an array of Aviator objects
  @Output() profilePictureChange = new EventEmitter<Aviator>();
  @Output() stepValidity = new EventEmitter<boolean>();

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    // Initialize the form group with your file control
    // this.profilePictureForm = this.fb.group({
    //   // The initial value can be null, and you add Validators.required
    //   profilePictureFile: [null, Validators.required]
    // });

    //this.profilePictureForm.markAllAsTouched();

    // You might want to update your parent component about validity
    // this.profilePictureForm.statusChanges.subscribe(status => {
    //   this.stepValidity.emit(status === 'VALID');
    // });
  }
  
  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      

      // You can process the file here (e.g., convert to base64, upload, etc.)
      const reader = new FileReader();
      reader.onload = (e: any) => {
        // Update the form control's value (you can use the file object or its URL)
        // this.profilePictureForm.get('profilePictureFile')?.setValue(file); // Set the file itself as value
        // // Update your display model (profilePicture() method)
        // // If profilePicture() comes from a service or parent, update it there.
        // // Assuming profilePicture() refers to a property that you can update locally:
        // // this.profilePictureData[0].urlDisplay = e.target.result;

        // // Manually trigger touch for validation display if needed on selection
        // this.profilePictureForm.get('profilePictureFile')?.markAsTouched();
        // this.profilePictureForm.get('profilePictureFile')?.markAsDirty();
      };

      const imageObj: Aviator = {
        file: file,
        urlDisplay: URL.createObjectURL(file),
      };

      console.log('Selected file:', file);

      // Add the new object to the signal

      this.profilePicture.update((pictures) => [...pictures, imageObj]);
      this.profilePictureChange.emit(imageObj);
      //reader.readAsDataURL(file); // Read the file as a data URL for preview
      this.stepValidity.emit(true);
    } else {
      // If no file is selected (e.g., user cancels), set control to null
      this.profilePictureForm.get('profilePictureFile')?.setValue(null);
      // Manually trigger touch for validation display if needed on clearing
      this.profilePictureForm.get('profilePictureFile')?.markAsTouched();
      this.profilePictureForm.get('profilePictureFile')?.markAsDirty();
      this.stepValidity.emit(false);
    }
  }

  get profilePictureFileControl(): FormControl  {
    return this.profilePictureForm.get('profilePictureFile') as FormControl;
  }

}

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentFormComponent } from './student-form.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('StudentFormComponent', () => {
  let component: StudentFormComponent;
  let fixture: ComponentFixture<StudentFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentFormComponent, FormControl, CommonModule, ReactiveFormsModule ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

// src/app/admission/admission-list/admission-list.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, Router } from '@angular/router'; // For navigation
import { Remult, remult } from 'remult'; // Import Remult for data access
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome'; // For icons
import { FormsModule } from '@angular/forms'; // For ngModel in filters

import { Applicant, ApplicationStatus } from '../../../../shared/entities/applicant'; // Import your AdmissionApplication entity

@Component({
  selector: 'app-admission-list',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink, // Important for [routerLink]
    FontAwesomeModule,
    FormsModule // Important for ngModel on filter inputs
  ],
  templateUrl: './admission-list.component.html',
  styleUrls: ['./admission-list.component.css']
})
export class AdmissionListComponent implements OnInit {
  applications: Applicant[] = [];
  isLoading = false;
  searchQuery = '';
  selectedStatus: ApplicationStatus | '' = '';
  selectedGrade = '';

  // Get all possible statuses from the enum
  applicationStatuses = Object.values(ApplicationStatus);

  // Remult repository for AdmissionApplication
  private applicationRepo;

  constructor(private router: Router) { 

    // Initialize the Remult repository for AdmissionApplication
    this.applicationRepo = remult.repo(Applicant);
    // Optionally, you can set up any additional configuration or services here
  } // Inject Remult and Router

  ngOnInit(): void {
    this.loadApplications();
  }

  async loadApplications(): Promise<void> {
    this.isLoading = true;
    try {
      const whereClause: any = {};
      if (this.selectedStatus) {
        whereClause.status = this.selectedStatus;
      }
      if (this.selectedGrade) {
        whereClause.gradeApplyingFor = this.selectedGrade;
      }
      if (this.searchQuery) {
        // Simple case-insensitive search on applicantName
        whereClause.applicantName = { $contains: this.searchQuery };
      }

      this.applications = await this.applicationRepo.find({
        where: whereClause,
        orderBy: { applicationDate: 'desc' } // Order by newest first
      });
    } catch (error) {
      console.error('Failed to load applications:', error);
      alert('Error loading applications. Please check console.');
    } finally {
      this.isLoading = false;
    }
  }

  applyFilters(): void {
    this.loadApplications(); // Re-load applications with current filter settings
  }

  clearFilters(): void {
    this.searchQuery = '';
    this.selectedStatus = '';
    this.selectedGrade = '';
    this.loadApplications();
  }

  editApplication(id: number): void {
    this.router.navigate(['/admin/applicants/edit', id]);
  }

  async deleteApplication(application: Applicant): Promise<void> {
    if (confirm(`Are you sure you want to delete ${application.firstName}'s application?`)) {
      try {
        await this.applicationRepo.delete(application);
        this.applications = this.applications.filter(app => app.id !== application.id); // Remove from local list
        alert('Application deleted successfully!');
      } catch (error) {
        console.error('Failed to delete application:', error);
        alert('Error deleting application. Please check console.');
      }
    }
  }

  // Quick update status from list (optional)
  async updateApplicationStatus(application: Applicant, newStatus: ApplicationStatus): Promise<void> {
    try {
      application.applicationStatus = newStatus;
      await this.applicationRepo.save(application);
      alert('Status updated successfully!');
    } catch (error) {
      console.error('Failed to update status:', error);
      alert('Error updating status. Please check console.');
    }
  }

  // Simulate "Enroll Student" - In a real app, this would trigger a backend process
  // to create a student record and potentially update the admission status to "Enrolled"
  async enrollStudent(application: Applicant): Promise<void> {
    if (confirm(`Are you sure you want to enroll ${application.firstName}? This will change their status to 'Enrolled'.`)) {
      try {
        application.applicationStatus = ApplicationStatus.Enrolled;
        await this.applicationRepo.save(application);
        alert(`${application.firstName} enrolled successfully!`);
        // In a real app, you might redirect to a student profile page or trigger a backend student creation process.
      } catch (error) {
        console.error('Failed to enroll student:', error);
        alert('Error enrolling student. Please check console.');
      }
    }
  }
}
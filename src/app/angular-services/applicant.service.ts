// src/app/angular-services/applicant.service.ts
import { Injectable } from '@angular/core';
import { remult } from 'remult';
import { Applicant, ApplicationStatus } from '../../shared/entities/applicant';
import { UserRole } from '../../shared/interfaces/user-models'; // Assuming UserRole is shared

@Injectable({
  providedIn: 'root'
})
export class ApplicantService {
  private applicantRepo = remult.repo(Applicant);

  constructor() { }

  async submitNewApplication(applicationData: Applicant): Promise<Applicant> {
    const newApplicant = this.applicantRepo.create({
      ...applicationData,
      applicationStatus: ApplicationStatus.Submitted, // Ensure status is pending on submission
      userId: remult.user?.id, // Link to the current logged-in user if applicable
    });
    return await this.applicantRepo.save(newApplicant);
  }

  async getMyApplications(): Promise<Applicant[]> {
    // This leverages the row-level security defined in the entity
    return await this.applicantRepo.find({
      orderBy: { applicationDate: 'desc' }
    });
  }
}
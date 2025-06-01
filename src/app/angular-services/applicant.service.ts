// src/app/angular-services/applicant.service.ts
import { Injectable } from '@angular/core';
import { remult } from 'remult';
import { Applicant, ApplicationStatus } from '../../shared/entities/applicant';
import { UserRole } from '../../shared/interfaces/user-models'; // Assuming UserRole is shared

@Injectable({
  providedIn: 'root',
})
export class ApplicantService {
  private applicantRepo = remult.repo(Applicant);

  constructor() {}

  async submitNewApplication(applicationData: Applicant): Promise<Applicant> {
    const newApplicant = this.applicantRepo.create({
      ...applicationData,
      applicationStatus: ApplicationStatus.Submitted, // Ensure status is pending on submission
      userId: remult.user?.id, // Link to the current logged-in user if applicable
    });
    return await this.applicantRepo.save(newApplicant);
  }

  async getApplicantById(id: number): Promise<Applicant | null> {
    // This will apply `allowApiRead` rules from the entity.
    // Ensure admins/staff have read access.
    const result = await this.applicantRepo.findId(id);
    return result ?? null;
  }

  async updateApplicant(applicant: Applicant): Promise<Applicant> {
    // Remult's save method intelligently inserts or updates.
    // Since applicant object passed will have an ID, it performs an update.
    return this.applicantRepo.save(applicant);
  }
}

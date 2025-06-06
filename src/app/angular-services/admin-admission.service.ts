import { Injectable } from '@angular/core';
import { remult } from 'remult';
import { Applicant, ApplicationStatus } from '../../shared/entities/applicant';
import { Student, EnrollmentStatus } from '../../shared/entities/student';
import { AdmissionProcessController } from '../../server/controllers/admission-process.controller'

@Injectable({
  providedIn: 'root'
})
export class AdminAdmissionService {
  private applicantRepo = remult.repo(Applicant);
  private studentRepo = remult.repo(Student);

  constructor() { }

  async getAllApplicants(): Promise<Applicant[]> {
    return this.applicantRepo.find({ orderBy: { createdAt: 'desc' } });
  }

  async getStudents(): Promise<Student[]> {
    return this.studentRepo.find({ orderBy: { createdAt: 'desc' } });
  }

  async makeDecision(applicantId: number, decision: 'accept' | 'reject', offerDetails?: string): Promise<string> {
    return await AdmissionProcessController.makeAdmissionDecision(applicantId, decision, offerDetails);
  }

  async finalizeEnrollment(studentId: number): Promise<string> {
    return await AdmissionProcessController.finalizeStudentEnrollment(studentId);
  }

  async getApplications(whereClause: any): Promise<Applicant[]> {
    console.log('Fetching applications with where clause:', whereClause);
    // This leverages the row-level security defined in the entity
    return await this.applicantRepo.find({
      where: whereClause,
      orderBy: { applicationDate: 'desc' }
    });
  }
}
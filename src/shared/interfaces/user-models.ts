// shared/interfaces/user-models.ts
export enum UserRole {
  Admin = 'admin',
  Staff = 'staff',
  Applicant = 'applicant',
  Student = 'student',
  Parent = 'parent',
}

export interface CurrentUser {
  id: string;
  name: string;
  roles?: UserRole[];
}
import { remultApi, remultExpress } from 'remult/remult-express';
import { Task } from '../shared/entities/Task';
//import { JsonDataProvider } from 'remult';

import { JsonDataProvider } from 'remult';
import { JsonEntityFileStorage } from 'remult/server';
import { Student } from '../shared/entities/student';
import { StudentProof } from '../shared/entities/StudentProof';
import { StudentController } from './controllers/StudentController';
import { TaskController } from './controllers/TaskController';
//import { AuthController } from '../shared/Controller/AuthController';
import { UserInfo } from '../shared/entities/UserInfo';
import { Applicant } from '../shared/entities/applicant';
import { AdmissionProcessController } from './controllers/admission-process.controller.ts';
//import { EmailService } from './backend-services/email.service';
//import { StudentPhotoController } from '../shared/Controller/StudentController';


export const api = remultApi({
  entities: [Task, Student, StudentProof, UserInfo, Applicant],
  admin: true, // Enable admin access for all entities
  controllers: [StudentController, TaskController, AdmissionProcessController],
  //services: [EmailService], // Add any backend services here
  dataProvider: async () =>
    new JsonDataProvider(new JsonEntityFileStorage('./db')),
  getUser: async (req) => {
    return req.session!['user'];
  },
});
// This code sets up an Express.js server with Remult for handling API requests.

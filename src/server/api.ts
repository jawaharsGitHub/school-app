import { remultApi, remultExpress  } from 'remult/remult-express';
import { Task } from '../shared/entities/Task';
//import { JsonDataProvider } from 'remult'; 

import { JsonDataProvider } from "remult"
import { JsonEntityFileStorage } from "remult/server"
import { Student } from '../shared/entities/Student';
import { StudentProof } from '../shared/entities/StudentProof';
import { StudentController } from './controllers/StudentController';
import { TaskController } from './controllers/TaskController';
//import { AuthController } from '../shared/Controller/AuthController';
import { UserInfo } from '../shared/entities/UserInfo';
import { AdmissionApplication } from '../shared/entities/AdmissionApplication';
//import { StudentPhotoController } from '../shared/Controller/StudentController';

export const api = remultApi({
  entities: [Task, Student, StudentProof, UserInfo, AdmissionApplication],
  admin: true, // Enable admin access for all entities
  controllers: [StudentController, TaskController],
  dataProvider: async () =>
    new JsonDataProvider(new JsonEntityFileStorage("./db")),
  getUser: async (req) => {
    return req.session!["user"];
  }

});
// This code sets up an Express.js server with Remult for handling API requests.

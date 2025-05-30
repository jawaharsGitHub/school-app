import { remultApi, remultExpress  } from 'remult/remult-express';
import { Task } from '../shared/Entities/Task';
//import { JsonDataProvider } from 'remult'; 

import { JsonDataProvider } from "remult"
import { JsonEntityFileStorage } from "remult/server"
import { Student } from '../shared/Entities/Student';
import { StudentProof } from '../shared/Entities/StudentProof';
import { StudentController } from '../shared/Controller/StudentController';
import { TaskController } from '../shared/Controller/TaskController';
//import { AuthController } from '../shared/Controller/AuthController';
import { UserInfo } from '../shared/Entities/UserInfo';
import { AdmissionApplication } from '../shared/Entities/AdmissionApplication';
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

import { remultApi, remultExpress  } from 'remult/remult-express';
import { Task } from '../shared/Entities/Task';
//import { JsonDataProvider } from 'remult'; 

import { JsonDataProvider } from "remult"
import { JsonEntityFileStorage } from "remult/server"
import { Student } from '../shared/Entities/Student';
import { StudentProof } from '../shared/Entities/StudentProof';
//import { StudentPhotoController } from '../shared/Controller/StudentController';

export const api = remultApi({
  entities: [Task, Student, StudentProof],
  //controllers: [StudentPhotoController],
  dataProvider: async () =>
    new JsonDataProvider(new JsonEntityFileStorage("./db"))

});
// This code sets up an Express.js server with Remult for handling API requests.

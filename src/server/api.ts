import { remultApi, remultExpress  } from 'remult/remult-express';
import { Task } from '../shared/Entities/Task';
//import { JsonDataProvider } from 'remult'; 

import { JsonDataProvider } from "remult"
import { JsonEntityFileStorage } from "remult/server"
import { Student } from '../shared/Entities/Student';
//import { StudentPhotoController } from '../shared/Controller/StudentController';

export const api = remultApi({
  entities: [Task, Student],
  //controllers: [StudentPhotoController],
  dataProvider: async () =>
    new JsonDataProvider(new JsonEntityFileStorage("./db"))

});
// This code sets up an Express.js server with Remult for handling API requests.

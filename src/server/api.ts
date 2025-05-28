import { remultApi, remultExpress  } from 'remult/remult-express';
import { Task } from '../shared/Task';
//import { JsonDataProvider } from 'remult'; 

import { JsonDataProvider } from "remult"
import { JsonEntityFileStorage } from "remult/server"

export const api = remultApi({
  entities: [Task],
  dataProvider: async () =>
    new JsonDataProvider(new JsonEntityFileStorage("./db"))

});
// This code sets up an Express.js server with Remult for handling API requests.

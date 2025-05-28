import { remultApi, remultExpress  } from 'remult/remult-express';
import { task } from '../shared/Task';
//import { JsonDataProvider } from 'remult'; 

import { JsonDataProvider } from "remult"
import { JsonEntityFileStorage } from "remult/server"

export const api = remultApi({
  entities: [task],
  dataProvider: async () =>
    new JsonDataProvider(new JsonEntityFileStorage("./db"))

});
// This code sets up an Express.js server with Remult for handling API requests.

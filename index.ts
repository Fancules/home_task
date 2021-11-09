import * as express from 'express';
import stationsRoute from './stations';
import metricsRoute from './metrics';
import connection from './db';

const app = express();
app.use(express.json());
app.use('/stations', stationsRoute);
app.use('/stations', metricsRoute);

connection.connect().then(() => {
  app.listen(8080, () => {
      console.log("Server is running");
  });
}).catch(err => {
  console.log("Couldn't connect to db");

})

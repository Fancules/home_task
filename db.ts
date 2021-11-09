import { getConnectionManager } from 'typeorm';
import Station from './entities/station';
import Metric from "./entities/metric";

const connectionManager = getConnectionManager();
const connection = connectionManager.create({
  type: 'postgres',
  host: 'localhost',
  username: 'yurii',
  password: '1111',
  database: 'radalarm',
  port: 5432,
  synchronize: true,
  logging: true,
  entities: [Station, Metric]
});

export default connection;

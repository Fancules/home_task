import Metric from './metric';
import {
  Column,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  OneToMany
} from 'typeorm';

@Entity('stations')
class Station extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', {length:255})
  address: String;

  @Column('boolean')
  status: Boolean;

  @OneToMany(
        () => Metric,
        metric => metric.station
  )
  metrics: Metric[];
}

export default Station;

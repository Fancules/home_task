import Station from './station';
import {
  Column,
  Entity,
  BaseEntity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn
} from 'typeorm';

@Entity('metrics')
class Metric extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('numeric')
  value: number;

  @Column('timestamp', {default: () => 'CURRENT_TIMESTAMP'})
  time: Date;

  @ManyToOne(() => Station,
            station => station.metrics,
            {
              onDelete: "CASCADE",
              eager: true
            }
  )
  @JoinColumn({name: 'station_id'})
  station: Station;
}

export default Metric;

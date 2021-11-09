import {Router, Request, Response} from 'express';
import Metric from './entities/metric';
import Station from './entities/station';
import { getRepository } from 'typeorm';

const router = Router();

function validate(req: Request, res: Response, next: any) {
    const station = req.body;
    if (station.hasOwnProperty('value')) {
        next();
    } else {
        res.sendStatus(400);
    }
}

function errHandler (res: Response) {
  return function (err: Error) {
    console.log(err);
    res.status(500);
  }
}

router.get('/:id/metrics', (req: Request, res: Response) => {
  Metric.find({station : {id : parseInt(req.params.id)}}).then(data => {
    res.send(data);
  }).catch(errHandler(res));
});


router.post('/:id/metrics', validate, (req: Request, res: Response) => {
    Station.findOne(req.params.id).then(station => {
      if(station){
        const metric = Metric.merge(new Metric(), {station, ...req.body});
        metric.save().then(data => {
          return res.send(data);
        });
      }else{
          res.sendStatus(404);
      }
    }).catch(errHandler(res));
});

router.get('/:id/active', async (req: Request, res: Response) => {
    const active = await getRepository(Metric)
        .createQueryBuilder('metrics')
        .leftJoinAndSelect('metrics.station', 'station')
        .where('station.status = true')
        .getMany();
    res.send(active);
});

router.get('/:id/max', async (req: Request, res: Response) => {
        getRepository(Metric)
        .createQueryBuilder('metrics')
        .leftJoin('metrics.station', 'station')
        .select('avg(metrics.value) as avg_metric')
        .addSelect('max(metrics.value) as max_metric')
        .addSelect('min(metrics.value) as min_metric')
        .addSelect('station.id')
        .groupBy('station.id')
        //.where('station.status = true')
        .execute().then(data => {
          res.send(data);
        }).catch(errHandler(res));

});


export default router;

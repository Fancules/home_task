import {Router, Request, Response} from 'express';
import Station from './entities/station';

const router = Router();

function validate(req: Request, res: Response, next: any) {
    const station = req.body;
    if (station.hasOwnProperty('address') && station.hasOwnProperty('status')) {
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

router.get('/', (req: Request, res: Response) => {
    Station.find().then(data => {
      res.send(data);
    }).catch(errHandler(res));
});

router.get('/:id', (req: Request, res: Response) => {
    Station.findOne(req.params.id).then(data => {
      if(data != null){
          res.send(data);
      }
    }).catch(errHandler(res));
});

router.post('/', validate, (req: Request, res: Response) => {
    const body = req.body;

    const station = Station.merge(new Station(), req.body);
    station.save().then(data => {
      res.send(data);
    }).catch(errHandler(res));
});

router.delete('/:id', (req: Request, res: Response) => {
    Station.findOne(req.params.id).then(station => {
      if(station){
        Station.delete(station);
        res.sendStatus(200);
      }
        res.sendStatus(404);
    }).catch(errHandler(res));
});

router.put('/:id', validate, (req: Request, res: Response) => {
    const body = req.body;
    Station.findOne(req.params.id).then(async station => {
      if(station){
        const data = Station.merge(station, body);
        await data.save();
        res.send(data);
      }
      res.sendStatus(404);
    }
    ).catch(errHandler(res));
});

export default router;

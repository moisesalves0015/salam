/**
 * server/routes/index.ts
 * Agrega todas as rotas da API.
 */

import { Router } from 'express';
import { studentsRouter } from './students';
import { missionsRouter } from './missions';
import { interventionsRouter } from './interventions';
import { cardsRouter } from './cards';
import { achievementsRouter } from './achievements';
import { rewardsRouter } from './rewards';
import { adminRouter } from './admin';

const apiRouter = Router();

apiRouter.use('/students', studentsRouter);
apiRouter.use('/missions', missionsRouter);
apiRouter.use('/interventions', interventionsRouter);
apiRouter.use('/cards', cardsRouter);
apiRouter.use('/achievements', achievementsRouter);
apiRouter.use('/rewards', rewardsRouter);
apiRouter.use('/admin', adminRouter);

export { apiRouter };

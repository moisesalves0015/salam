/**
 * server/routes/index.ts
 * Agrega todas as rotas da API.
 */

import { Router } from 'express';
import { authRouter } from './auth';
import { studentsRouter } from './students';
import { missionsRouter } from './missions';
import { interventionsRouter } from './interventions';
import { cardsRouter } from './cards';
import { achievementsRouter } from './achievements';
import { rewardsRouter } from './rewards';
import { trailsRouter } from './trails';
import { adminRouter } from './admin';
import { adminConsoleRouter } from './adminConsole';

const apiRouter = Router();

apiRouter.use('/auth', authRouter);
apiRouter.use('/students', studentsRouter);
apiRouter.use('/missions', missionsRouter);
apiRouter.use('/interventions', interventionsRouter);
apiRouter.use('/cards', cardsRouter);
apiRouter.use('/achievements', achievementsRouter);
apiRouter.use('/rewards', rewardsRouter);
apiRouter.use('/trails', trailsRouter);
apiRouter.use('/admin', adminRouter);
apiRouter.use('/admin-console', adminConsoleRouter);

export { apiRouter };

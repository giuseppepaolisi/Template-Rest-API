import { bootstrapExpress } from './app';
import { logger } from '../config/logger';
import { validateEnv } from '../config/env.config';
import { connectToDB } from '../config/mongoose';

export const bootstrap = async (app: any) => {
  try {
    validateEnv();
    await connectToDB();
    bootstrapExpress(app);
    logger.info('Express app initiated.');
  } catch (error) {
    logger.error('Failed to bootstrap the application', { error });
    process.exit(1);
  }
};

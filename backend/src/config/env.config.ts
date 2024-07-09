import dotenv from 'dotenv';
import { envSchema, EnvConfig } from '../validation/env.validation';
import { ZodError } from 'zod';

dotenv.config();

export const validateEnv = (): EnvConfig => {
  try {
    const envVars: EnvConfig = envSchema.parse(process.env);
    return {
      PORT: envVars.PORT,
      NODE_ENV: envVars.NODE_ENV,
      MONGO_DB_URI: envVars.MONGO_DB_URI
    };
  } catch (error) {
    if (error instanceof ZodError) {
      console.error('Validation failed:', error.errors);
      throw new Error('Invalid environment variables');
    } else {
      console.error('Error parsing environment variables:', error);
      throw error;
    }
  }
};
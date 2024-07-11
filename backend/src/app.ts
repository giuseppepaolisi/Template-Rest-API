import { config } from 'dotenv';
import express from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import cors from 'cors';
import { corsOptions } from './config/corsOptions';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import {
  notFoundMiddleware,
  errorHandlerMiddleware,
} from './middlewares/index.middleware';
import api from './api/index.api';
import ExpressMongoSanitize from 'express-mongo-sanitize';
import { errorHandler, successHandler } from './config/morgan';

// Load environment variables from .env file
config();

const app = express();

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true, limit: '30mb' }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: 'cross-origin' }));
app.use(helmet.xssFilter());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],
      scriptSrc: ["'self'", "'trusted-cdn.com'"],
      objectSrc: ["'none'"],
      upgradeInsecureRequests: [],
    },
  })
);
app.use(cors());
app.use(cors(corsOptions));
app.use(express.json());
app.use(ExpressMongoSanitize());

// API routes
app.use('/api/', api);

// Error handling middleware
app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

export default app;

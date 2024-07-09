import { config } from "dotenv";
import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import { notFound, errorHandler } from "./middlewares/index.middleware";
import api from "./api/index.api";
import { validateEnv } from './config/env.config';

// Load environment variables from .env file
config();

const app = express();

// Middleware setup
app.use(bodyParser.urlencoded({ extended: true, limit: "30mb" }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(helmet());
app.use(cors());
app.use(express.json());

// API routes
app.use("/api/", api);

// Error handling middleware
app.use(notFound);
app.use(errorHandler);

export default app;
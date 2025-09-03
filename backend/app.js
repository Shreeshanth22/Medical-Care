import express from "express";
import { config } from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import { dbConnection } from "./database/dbConnection.js";
import messageRouter from "./router/messageRouter.js";
import userRouter from "./router/userRouter.js";
import { errorMiddleware } from "./middlewares/errorMiddleware.js";
import appointmentRouter from "./router/appointmentRouter.js";

const app = express();

// Load environment variables
config({ path: "./config/config.env" });

// CORS configuration
app.use(
    cors({
        origin: [process.env.FRONTEND_URL, process.env.DASHBOARD_URL], // make sure these are set in .env
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true, // enable cookie/header access from frontend
    })
);

// Middleware to parse cookies
app.use(cookieParser());

// ✅ Middleware to parse JSON and form data
app.use(express.json()); // application/json
app.use(express.urlencoded({ extended: true })); // application/x-www-form-urlencoded

// ✅ Middleware to handle file uploads
app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
    })
);

// Connect to MongoDB
dbConnection();

// Routers
app.use("/api/v1/message", messageRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/appointment", appointmentRouter);

// Global Error Handler
app.use(errorMiddleware);

export default app;

import express from "express";
import dotenv from "dotenv";
import connectDB from "./db/connect.js";
import "express-async-errors";
import path from "path";
import cors from "cors";
const app = express();
dotenv.config();


// middleware import
import errorHandlerMiddleware from "./middleware/error-handler.js";
import notFoundMiddleware from "./middleware/not-found.js";

// routes import
import authRouter from "./routes/auth-routes.js";
import jobsRouter from "./routes/jobs-routes.js";
import clientRouter from "./routes/client-routes.js";

// middleware
app.use(express.json());
app.use(cors());

// routes
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/jobs", jobsRouter);
app.use("/api/v1/clients", clientRouter);

// Your code
if (process.env.NODE_ENV === "PRODUCTION") {
    const __dirname = path.resolve();
    app.use(express.static(path.resolve(__dirname, 'client', 'build')));
    app.get("*", (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'), function (err) {
            if (err) {
                res.status(500).send(err)
            }
        });
    })
}
// Your code

app.use(errorHandlerMiddleware);
app.use(notFoundMiddleware);

const start = async () => {
    const PORT = process.env.PORT || 5000;
    await connectDB(process.env.MONGO_URL);
    app.listen(PORT, () => {
        console.log(`server is running on port: ${PORT}`);
    });
}

start();

export default app;
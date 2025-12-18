import express from "express";
import appRouter from "./appRouter";

const app = express();

app.use(express.json());
app.use(appRouter);

export default app;
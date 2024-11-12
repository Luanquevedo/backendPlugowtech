import express, { json } from "express";
import userRoutes from "./routes/userRoutes.js";

const app = express();
app.use(json());

app.use("/api", userRoutes);

export const listen = (port, callback) => {
  app.listen(port, callback);
};

export default app;

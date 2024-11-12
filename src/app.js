const express = require("express");
const userRoutes = require("./routes/userRoutes");

const app = express();
app.use(json());

app.use("/api", userRoutes);

export const listen = (port, callback) => {
  app.listen(port, callback);
};

export default app;
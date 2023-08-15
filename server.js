const { app } = require("./utils/app");
const viewsRouter = require("./src/routes/viewsRouter");

app.get("/healthcheck", (req, res) => {
  return res.json({
    status: "running",
    date: new Date(),
  });
});

app.use("/", viewsRouter);

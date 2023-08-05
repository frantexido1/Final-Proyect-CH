const { app } = require("./utils/app");
const productsRouter = require("./src/routes/productsRouter");
const cartsRouter = require("./src/routes/cartsRouter");
const viewsRouter = require("./src/routes/viewsRouter");

app.use("/api/products/", productsRouter);
app.use("/api/cart/", cartsRouter);
app.use("/", viewsRouter);

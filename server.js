const express = require("express");
const compression = require("express-compression");
const handlebars = require("express-handlebars");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const viewsRouter = require("./src/routes/viewsRouter");
const errorMiddleware = require("./src/middlewares/errors/index");
const initializePassport = require("./src/config/passport.config");
const addLogger = require("./src/utils/logger");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerOptions = require("./src/utils/swagger");
const swaggerUiExpress = require("swagger-ui-express");

const app = express();
const PORT = 8080;
const connection =
  "mongodb+srv://admin:admin1234@cluster0.oizvoya.mongodb.net/?retryWrites=true&w=majority";

app.use(
  "/apidocs",
  swaggerUiExpress.serve,
  swaggerUiExpress.setup(swaggerJSDoc(swaggerOptions))
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorMiddleware);
app.engine("handlebars", handlebars.engine());
app.set("views", "./src/views");
app.set("view engine", "handlebars");

app.use(express.static("public"));
app.use(compression());

mongoose
  .connect(connection)
  .then(() => console.log("conexion DB"))
  .catch((error) => console.log(error));

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: connection,
    }),
    secret: "secretSession",
    resave: false,
    saveUninitialized: false,
    ttl: 60 * 60 * 24, // 24hrs
  })
);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use(addLogger);

app.get("/", (req, res) => {
  return res.json({
    status: "running",
    date: new Date(),
  });
});

app.use("/", viewsRouter);

app.listen(PORT, () =>
  console.log(`Server listening at http://localhost:${PORT}`)
);

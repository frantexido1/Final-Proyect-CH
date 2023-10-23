const express = require("express");
const compression = require("express-compression");
const app = express();
const handlebars = require("express-handlebars");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const viewsRouter = require("./src/routes/viewsRouter");
const errorMiddleware = require("./src/middlewares/errors/index");
const initializePassport = require("./src/config/passport.config");
const addLogger = require("./src/utils/logger");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errorMiddleware);
app.engine("handlebars", handlebars.engine());
app.set("views", "./src/views");
app.set("view engine", "handlebars");

app.use(express.static("public"));
app.use(compression());

//MongoDB
const MONGODB_CONNECT =
  "mongodb+srv://admin:admin1234@cluster0.oizvoya.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(MONGODB_CONNECT)
  .then(() => console.log("conexion DB"))
  .catch((error) => console.log(error));
//

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: MONGODB_CONNECT,
    }),
    secret: "secretSession",
    resave: true,
    saveUninitialized: true,
  })
);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

app.use(addLogger);

const PORT = 8080;
app.listen(PORT, () =>
  console.log(`Server listening at http://localhost:${PORT}`)
);

app.get("/", (req, res) => {
  return res.json({
    status: "running",
    date: new Date(),
  });
});

app.use("/", viewsRouter);

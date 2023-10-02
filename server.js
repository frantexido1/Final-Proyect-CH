const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const handlebars = require("express-handlebars");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const passport = require("passport");
const viewsRouter = require("./src/routes/viewsRouter");

const initializePassport = require("./src/config/passport.config");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine("handlebars", handlebars.engine());
app.set("views", "./src/views");
app.set("view engine", "handlebars");

app.use(express.static("public"));

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
      ttl: 120,
    }),
    secret: "secretSession",
    resave: true,
    saveUninitialized: true,
  })
);

initializePassport();
app.use(passport.initialize());
app.use(passport.session());

const PORT = 8081;
server.listen(PORT, () =>
  console.log(`Server listening at http://localhost:${PORT}`)
);

app.get("/", (req, res) => {
  return res.json({
    status: "running",
    date: new Date(),
  });
});

app.use("/", viewsRouter);

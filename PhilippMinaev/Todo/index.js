const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const exphbs = require("express-handlebars");
const todoRoutes = require("./routes/todos");
const bodyParser = require("body-parser");
const cors = require("cors");

const PORT = process.env.PORT || 3000;

const app = express();
const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs",
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(cors());

app.use(todoRoutes);

async function start() {
  try {
    await mongoose.connect(
      "mongodb+srv://filamin:Qwerty1234@cluster0.k0szd.gcp.mongodb.net/Todos",
      {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
      }
    );
    app.listen(PORT, () => {
      console.log(`Server has been started... (http://localhost:${PORT})`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();


const express = require("express");
const path = require("path");
const logger = require("morgan");
const methodOverride = require("method-override");
const cookieParser = require("cookie-parser");
const cohortsRouter = require("./routes/cohorts");
const app = express();

app.set('view engine', 'ejs');
app.set("views", "views");

app.use(logger("dev"));
app.use(cookieParser())

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, "/public")));

app.use(methodOverride((req, res) => {
  if (req.body && req.body._method) {
      const method = req.body._method
      delete req.body._method 
   return method
}
}));

app.get("/", (req, res) => {
  res.render("home")
})

app.use("/cohorts", cohortsRouter);

const PORT = 3000;
const ADDRESS = "localhost"; 
app.listen(process.env.PORT || PORT, ADDRESS, () => {
  console.log(`Server listening on http://${ADDRESS}:${PORT}`);
});
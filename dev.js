const path = require('path');
const express = require('express');
const livereload = require("livereload");
const hbs = require('express-handlebars');
const connectLiveReload = require("connect-livereload");

const liveReloadServer = livereload.createServer();
liveReloadServer.server.once("connection", () => setTimeout(() => liveReloadServer.refresh("/"), 100));

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(connectLiveReload());
app.set('view engine', '.hbs');
app.use(express.static("public"));

app.engine('.hbs', hbs.engine({
  extname: '.hbs', defaultLayout: "base",
  layoutsDir: path.join("views", "layouts"),
  partialsDir: path.join("views", "partials"),
}));

app.get('/', (req, res) => res.render('home', { year: new Date().getFullYear() }));

app.listen(port, () => console.debug(`Server listening at http://localhost:${port}`));
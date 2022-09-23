import path from 'path';
import express from 'express';
import { engine } from 'express-handlebars';

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.set('view engine', '.hbs');
app.use(express.static("public"));

app.engine('.hbs', engine({
  extname: '.hbs', defaultLayout: "base",
  layoutsDir: path.join("views", "layouts"),
  partialsDir: path.join("views", "partials"),
}));


app.get('/', (req, res) => res.render('home', { year: new Date().getFullYear() }));

app.listen(port, () => console.debug(`Server listening at http://localhost:${port}`));
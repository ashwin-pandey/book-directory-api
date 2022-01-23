const express = require('express');
const { AuthorRouter } = require('./routes/author.routes');
const { BooksRouter } = require('./routes/books.routes');
const { CategoryRouter } = require('./routes/category.routes');
const app = express();

/**ENV CONFIG */
require('dotenv').config({path: __dirname + '/.env'});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/**CORS HEADERS */
app.use(function(req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
      "Access-Control-Allow-Methods",
      "GET, POST, PUT , PATCH, DELETE, OPTIONS"
  );
  res.setHeader(
      "Access-Control-Allow-Headers",
      "X-Requested-With,  x-xsrf-token, Content-Type, Authorization"
  );
  next();
});

/**DB CONNECT */
require('./config/db.config');

app.get('/', (req, res) => {
  res.send("Hello!");
});

app.use('/books', BooksRouter);
app.use('/authors', AuthorRouter);
app.use('/categories', CategoryRouter);

const port = process.env.PORT;
app.listen(port, (error) => {
    if (error) {
        console.log(`Error listening on port ${port} - ${error}`);
    } else {
        console.log(`Listening on port ${port}`);
    }
});

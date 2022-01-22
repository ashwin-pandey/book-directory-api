const { BadRequestException } = require('../exception/exception');
const Books = require('../model/books.model');

/**
 * GET /books
 * @param {*} req 
 * @param {*} res 
 * @returns List of books
 */
exports.getAllBooks = (req, res) => {
  // implement query filters

  // fetch all the books
  Books.find({}, (error, books) => {
    if (error) {
      console.log(error);
      res.status(400);
      res.send(new BadRequestException("Encountered an error while processing the request!", error.message));
      return;
    }
    res.status(200);
    res.send(books);
    return;
  });
}

/**
 * GET /books/:id
 * @param {*} req 
 * @param {*} res 
 * @returns a specific book
 */
exports.getSpecificBook = (req, res) => {
  const id = req.params.id;

  // validate the id
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    // it's an invalid ObjectId.
    console.log(`Book id '${id}' is invalid. Please check again.`);
    res.status(400);
    res.send(new BadRequestException(`Book id '${id}' is invalid. Please check again.`, `Book id '${id}' is invalid. Please check again.`));
    return;
  }

  // find the book
  Books.findOne({ "_id": id }, (error, book) => {
    if (error) {
      console.log(error);
      res.status(400);
      res.send(new BadRequestException("Encountered an error while processing the request!", error.message));
      return;
    } else {
      res.status(200);
      res.send(book);
      return;
    }
  });
}



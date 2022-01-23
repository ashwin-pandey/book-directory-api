const { BadRequestException, NotFoundException } = require('../exception/exception');
const Books = require('../model/books.model');
const url = require('url');
const { statusEnum } = require('../model/status.enum');

/**
 * GET /books
 * @param {*} req 
 * @param {*} res 
 * @returns List of books
 */
exports.getAllBooks = (req, res) => {
  // implement query filters
  var filters = {};
  const author = req.query.authorName;
  const category = req.query.categoryName;
  const status = req.query.status;
  if (author) { 
    filters.authorName = author;
  } 
  if (category) {
    filters.categoryName = category;
  }
  if (status) {
    filters.status = status;
  } else {
    filters.status = statusEnum.active;
  }

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
  }).where(filters);
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
    }
    if (book != null) {
      res.status(404);
      res.send(new NotFoundException(`Book with id '${id}' not found.`));
      return;
    }
    res.status(200);
    res.send(book);
    return;
  });
}


/**
 * POST /books
 * @param {*} req 
 * @param {*} res 
 * @description Creates a new book
 * @returns Returns the created book
 */
exports.createBook = (req, res) => {
  // validate payload
  var payload = req.body;
  if (payload.status) {
    if (payload.status !== statusEnum.active || payload.status !== statusEnum.deleted) {
      res.status(400);
      res.send(new BadRequestException("Invalid payload. Status can either be 'active' or 'deleted'.", "Invalid payload. Status can either be 'active' or 'deleted'."));
      return;
    }
  } else {
    payload.status = statusEnum.active;
  }

  // create book
  Books.create(req.body, (error, book) => {
    if (error) {
      console.log(error);
      res.status(400);
      res.send(new BadRequestException("Encountered an error while processing the request!", error.message));
      return;
    }
    res.status(201);
    res.send(book);
    return;
  })
}


/**
 * PATCH /books/:id
 * @param {*} req 
 * @param {*} res 
 * @returns 
 */
exports.patchBook = (req, res) => {
  const id = req.params.id;

  // validate the id
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    // it's an invalid ObjectId.
    console.log(`Book id '${id}' is invalid. Please check again.`);
    res.status(400);
    res.send(new BadRequestException(`Book id '${id}' is invalid. Please check again.`, `Book id '${id}' is invalid. Please check again.`));
    return;
  }

  // get the payload from body
  const updateObject = req.body;

  // validate status
  if (updateObject.status) {
    if (updateObject.status !== statusEnum.active || updateObject.status !== statusEnum.deleted) {
      res.status(400);
      res.send(new BadRequestException("Status can either be 'active' or 'deleted'.", "Status can either be 'active' or 'deleted'."));
      return;
    }
  } else {
    updateObject.status = statusEnum.active;
  }
  
  // update modified date
  updateObject.modifiedAt = Date.now();
  
  // update the book
  Books.updateOne({_id  : req.params.id}, {$set: updateObject}, (error, updatedBook) => {
    if (error) {
      console.log(error);
      res.status(400);
      res.send(new BadRequestException("Encountered an error while processing the request!", error.message));
      return;
    }
    if (!updatedBook.modifiedCount) {
      res.status(404);
      res.send(new NotFoundException(`Book with id '${id}' not found.`));
      return;
    }
    Books.findOne({_id  : req.params.id}, (error, book) => {
      if (book == null) {
        res.status(404);
        res.send(new NotFoundException(`Book with id '${id}' not found.`));
        return;
      }
      res.status(200);
      res.send(book);
      return;
    });
  });
}

/**
 * DELETE /books/:id
 * @description Deletes the specific book
 * @param {*} req 
 * @param {*} res 
 */
exports.deleteBook = (req, res) => {
  // set status as deleted
  const updateObject = {
    'status': statusEnum.deleted
  };

  Books.updateOne({ _id: req.params.id, 'status': statusEnum.active }, {$set: updateObject}, (error, book) => {
    if (error) {
      console.log(error);
      res.status(400);
      res.send(new BadRequestException("Encountered an error while processing the request!", error.message));
      return;
    }
    res.status(204);
    // res.send(book);
    return;
  })
}

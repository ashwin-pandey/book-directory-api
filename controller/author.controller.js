const { BadRequestException } = require('../exception/exception');
const Author = require('../model/author.model');

exports.getAllAuthors = (req, res) => {
  Author.find({}, (error, authors) => {
    if (error) {
      console.log(error);
      res.status(400);
      res.send(new BadRequestException("Encountered an error while processing the request!", error.message));
      return;
    } 
    res.status(200);
    res.send(authors);
    return;
  });
}


exports.getSpecificAuthor = (req, res) => {
  const id = req.params.id;

  // validate the id
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    // it's an invalid ObjectId.
    console.log(`Author id '${id}' is invalid. Please check again.`);
    res.status(400);
    res.send(new BadRequestException(`Author id '${id}' is invalid. Please check again.`, `Author id '${id}' is invalid. Please check again.`));
    return;
  }

  // find the book
  Author.findOne({ "_id": id }, (error, author) => {
    if (error) {
      console.log(error);
      res.status(400);
      res.send(new BadRequestException("Encountered an error while processing the request!", error.message));
      return;
    } 
    res.status(200);
    res.send(author);
    return;
  });
}


exports.createAuthor = (req, res) => {
  Author.create(req.body, (error, author) => {
    if (error) {
      console.log(error.message);
      return;
    }
    res.status(201);
    res.send(author);
    return;
  });
}


exports.updateAuthor = (req, res) => {
  
}

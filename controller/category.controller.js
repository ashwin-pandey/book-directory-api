const { BadRequestException } = require('../exception/exception');
const Category = require('../model/category.model');

exports.getAllCategories = (req, res) => {
  Category.find({}, (error, authors) => {
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


exports.getSpecificCategory = (req, res) => {
  const id = req.params.id;

  // validate the id
  if (!id.match(/^[0-9a-fA-F]{24}$/)) {
    // it's an invalid ObjectId.
    console.log(`Category id '${id}' is invalid. Please check again.`);
    res.status(400);
    res.send(new BadRequestException(`Category id '${id}' is invalid. Please check again.`, `Category id '${id}' is invalid. Please check again.`));
    return;
  }

  // find the book
  Category.findOne({ "_id": id }, (error, category) => {
    if (error) {
      console.log(error);
      res.status(400);
      res.send(new BadRequestException("Encountered an error while processing the request!", error.message));
      return;
    } 
    res.status(200);
    res.send(category);
    return;
  });
}


exports.createCategory = (req, res) => {
  Category.create(req.body, (error, category) => {
    if (error) {
      console.log(error.message);
      res.status(400);
      res.send(new BadRequestException("Encountered an error while processing the request!", error.message));
      return;
    }
    res.status(201);
    res.send(category);
    return;
  });
}


exports.updateCategory = (req, res) => {
  Category.updateOne(req.body, (error, category) => {
    if (error) {
      if (error) {
        console.log(error.message);
        res.status(400);
        res.send(new BadRequestException("Encountered an error while processing the request!", error.message));
        return;
      }
      res.status(200);
      res.send(category);
      return;
    }
  })
}

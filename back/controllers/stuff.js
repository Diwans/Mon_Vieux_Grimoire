const Book = require ('../models/Book');

exports.createBook = (req, res, next) =>{
    delete req.body._id;
    const book = new Book ({
        ...req.body
    });
    book.save()
      .then(()=> res.status(201).json({message: 'livre enregistré !'}))
      .catch( error => res.status(400).json({ error }));
      next();
  };

exports.getAllBooks = (req, res, next)=>{
    Book.find()
     .then(books => res.status(200).json(books))
     .catch(error => res.status(400).json({ error }));
     next();
   };

exports.getOneBook = (req, res, next)=>{
    Book.findOne({ _id: req.params.id})
    .then(book => res.status(200).json(book))
    .catch(error => res.status(400).json({ error }));
    next();
  };
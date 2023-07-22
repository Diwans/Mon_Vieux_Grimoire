const Book = require ('../models/Book');

exports.createBook = (req, res, next) =>{
  thingObject = JSON.parse(req.body.thing);
  delete thingObject._id;
  delete thingObject._userId;
  const thing = new thing ({
    ...thingObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  
  thing.save()
  .then(() => { res.status(201).json({ message: 'Livre enregistré !'})})
  .catch(error => { res.status(400).json({ error })});
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
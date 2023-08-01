const Book = require ('../models/Book');

exports.createBook = (req, res, next) =>{
  bookObject = JSON.parse(req.body.book);

  delete bookObject._id;
  const book = new Book ({
    ...bookObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
  });
  
  book.save()
  .then(() =>  res.status(201).json({ message: 'Livre enregistré '}))
  .catch(error =>  res.status(400).json({ error}));
  };

exports.getAllBooks = (req, res, next)=>{
    Book.find()
     .then(books => res.status(200).json(books))
     .catch(error => res.status(400).json({ error }));
   };

exports.getOneBook = (req, res, next)=>{
    Book.findOne({ _id: req.params.id})
    .then(book => res.status(200).json(book))
    .catch(error => res.status(400).json({ error }));
  };

exports.modifyBook = ( req, res, next)=>{
    const bookObject = req.file ? {
      ...JSON.parse(req.body.book),
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    } : { ...req.body} ;

    delete bookObject._userId;

    Book.findOne({ _id: req.params.id })
      .then((book) => {
        if (book.userId !== req.auth.userId){
          res.status(401).json({ message : 'Non-autorisé'})
        } else {
          Book.updateOne({ _id: req.params.id }, { ...bookObject, _id: req.params.id})
            .then(() => res.status(200).json({ message: 'objet modifié'}))
            .catch(error => res.status(401).json({ error }));
      }
  })
  .catch((error) =>{
    res.status(400).json({error});
  });
};

exports.deleteBook = ( req, res, next)=>{
  Book.deleteOne({ _id: req.params.id})
    .then(()=> res.status(200).json({ message: 'objet supprimé'}))
    .catch(error => res.status(400).json({ error }))
};

exports.rateBook = (req, res, next)=>{
  if ( 0 <= req.body.rating <= 5 ) {
    const url = req.url;
    const urlId = url.split('/')[1];
    const bookFilter = { _id: urlId };
    const updatedUserId = req.body.userId;
    const updatedGrade = req.body.rating;
  
    const updatedData = {
      userId: updatedUserId,
      grade: updatedGrade,
    };
  
    Book.findOneAndUpdate(
      bookFilter,
      { $push: { ratings: updatedData } },
      { new: true }
    )
      .then((updatedBook) => {
        const totalRatings = updatedBook.ratings.length;
        const ratingsSum = updatedBook.ratings.reduce(
          (acc, rating) => acc + rating.grade,
          0
        );
        updatedBook.averageRating = ratingsSum / totalRatings;
  
        return updatedBook.save();
      })
      .then((book) => {
        res.status(200).json(book);
      })
      .catch((error) => res.status(400).json({ error }));
  } else {
    res.status(400).json({ message: 'la note doit etre comprise entre 0 et 5 '})
  }
};

exports.bestRating = ( req, res, next) => {
  Book.find().sort({ averageRating: -1}).limit(3)
    .then((books)=>res.status(200).json(books))
    .catch((error)=>res.status(404).json({ error }))
};
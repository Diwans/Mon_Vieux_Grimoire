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
    const ratingObject = { ...req.body, grade: req.body.rating };
    delete ratingObject._id;
    Book.findOne({_id: req.params.id})
    .then( book =>{
      const newRate = book.ratings;
      const userIdArray = newRate.map(rating => rating.userId);

      if (userIdArray.includes(req.auth.userId)){
        res.status(403).json({ message: 'Vous avez déjà noté ce livre !'})
      } else {
        newRate.push(rateObject);
        const grades = newRate.map(rating => rating.grade);
        const averageGrades = average.average(grades);

        book.averageRate = averageGrades;

        Book.updateOne({ _id: req.params.id}, { rate: newRate, averageRate: averageGrades, _id: req.params.id})
          .then( () => {res.status(201).json()})
          .catch( error => {res.status(400).json({ error })})
        res.status(200).json(book);
      }
    })
    .catch((error)=>{res.status(404).json({ error })})
  } else {
    res.status(400).json({ message: 'la note doit etre comprise entre 0 et 5 '})
  }
};

exports.bestRating = ( req, res, next) => {
  Book.find().sort({ averageRate: -1}).limit(3)
    .then((books)=>res.status(200).json(books))
    .catch((error)=>res.status(404).json({ error }))
};
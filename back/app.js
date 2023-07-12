const express = require('express');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb+srv://randomuser123:RandomUser123@cluster0.58rmp1l.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  app.post('/api/books', (req, res, next) =>{
    console.log(req.body);
    res.status(201).json({
        message: 'livre posté !'
    });
    next();
  });

  app.post('/api/auth/signup', (req, res, next) =>{
    console.log(req.body);
    res.status(201).json({
        message: 'authentification signup reussi !'
    });
    next();
  });

  app.post('/api/auth/login', (req, res, next) =>{
    console.log(req.body);
    res.status(201).json({
        message: 'authentification login reussi !'
    });
    next();
  });


  app.post('/api/books/:id/rating', (req, res, next) =>{
    console.log(req.body);
    res.status(201).json({
        message: 'note du livre en question'
    });
    next();
  });
  
app.get('/api/books', (req, res, next)=>{
    const stuff = [
      {
        _id: 'oeihfzeoi',
        title: 'Mon premier objet',
        description: 'Les infos de mon premier objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price: 4900,
        userId: 'qsomihvqios',
      },
      {
        _id: 'oeihfzeomoihi',
        title: 'Mon deuxième objet',
        description: 'Les infos de mon deuxième objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price: 2900,
        userId: 'qsomihvqios',
      },
    ];
    next();
    res.status(200).json(stuff);
  });

  app.get('/api/books/:id', (req, res, next)=>{
    const stuff = [
      {
        _id: 'oeihfzeoi',
        title: 'Mon premier objet',
        description: 'Les infos de mon premier objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price: 4900,
        userId: 'qsomihvqios',
      },
      {
        _id: 'oeihfzeomoihi',
        title: 'Mon deuxième objet',
        description: 'Les infos de mon deuxième objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price: 2900,
        userId: 'qsomihvqios',
      },
    ];
    next();
    res.status(200).json(stuff);
  });

  app.get('/api/books/bestrating', (req, res, next)=>{
    const stuff = [
      {
        _id: 'oeihfzeoi',
        title: 'Mon premier objet',
        description: 'Les infos de mon premier objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price: 4900,
        userId: 'qsomihvqios',
      }
    ];
    next();
    res.status(200).json(stuff);
  });

module.exports = app;

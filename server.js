const { db, Place, syncAndSeed } = require('./db');
const express = require('express');
const app = express();
const path = require('path');

app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/api/places', async(req,res,next)=>{
    try{
        const places = await Place.findAll();
        res.send(places);
    }
    catch(err){
        next(err);
    }
});

app.post('/api/places',async(req,res,next)=>{
    try{
        const newPlace = await Place.create({name: req.body.name, description: req.body.description});
        res.status(201).send(newPlace);
    }
    catch(err){
        next(err);
    }
});

app.delete('/api/place/:id',async(req,res,next)=>{
    try{
        const place = await Place.findByPk(req.params.id);
        await place.destroy();
        res.sendStatus(204);
    }
    catch(err){
        next(err);
    }
});

const start = async ()=>{
    try{
        await db.sync();
        await syncAndSeed();

        const port = process.env.PORT || 3000;
        app.listen(port, ()=> console.log(`listening on ${port}`));
    }
    catch(err){
        console.log(err);
    }
};

start();
import http from 'http';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { initialFetch } from './init.js';
import { getPokemons, getPokemonType, allPokemonPage, pokemonTypesPage, notFound } from './controllers/pokemonController.js';

dotenv.config()
const PORT = process.env.PORT || 5000;
const URL = process.env.URL || 'mongodb://localhost:27017';

const server = http.createServer((req, res) => {
    if (req.url === '/api/pokemon' && req.method === 'GET') {
        getPokemons(req, res);
        return;
    } else if (req.url.match(/\/api\/pokemon\/\w+/) && req.method === 'GET') {
        //ENDPOINT /api/pokemon/{type}
        const type = req.url.split('/')[3];
        getPokemonType(req, res, type);
        return;
    } else if (req.url === '/pokemon') {
        allPokemonPage(req, res);
        return;
    } else if (req.url === '/pokemon-types') {
        pokemonTypesPage(req, res);
        return;
    } else {
        notFound(req, res);
        return;
    }
});

mongoose.connect(URL).then(() => {    
    server.listen(PORT, () => console.log(`Server Running on http://localhost:${PORT}`));
    mongoose.connection.db.listCollections().toArray(function (err, names) {
        if (err) {
            console.log(err);
        } else {
            if (names.length === 0) {
                initialFetch();
            }
        }
    });

}).catch((err) => {
    console.log('Error:', err.message)
})


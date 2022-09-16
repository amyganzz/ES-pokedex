import Pokemon from "../models/pokemon.js";
import fs from 'fs';

var response = {
    code: null,
    message: null,
    time: '',
    count: 0,
    data: []
};

export const getPokemons = async (req, res) => {
    var start = new Date();
    var finish;
    try {
        const pokes = await Pokemon.find();

        finish = new Date();
        response.code = 200;
        response.message = "Gotta catch 'em all!";
        response.time = Math.round((start - finish) / 100) + 's';
        response.count = pokes.length;
        response.data = pokes;

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(response))

    } catch (err) {
        finish = new Date();
        response.code = 500;
        response.message = err.message;
        response.time = Math.round((start - finish) / 100) + 's';

        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(response))
    }
}

export const getPokemonType = async (req, res, type) => {
    var start = new Date();
    var finish;
    try {
        const pokes = await Pokemon.find({ types: type });

        finish = new Date();
        response.code = 200;
        response.message = "Gotta catch 'em all!";
        response.time = Math.round((start - finish) / 100) + 's';
        response.count = pokes.length;
        response.data = pokes;

        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(response))
    } catch (err) {
        finish = new Date();
        response.code = 500;
        response.message = err.message;
        response.time = Math.round((start - finish) / 100) + 's';

        res.writeHead(500, { 'Content-Type': 'application/json' })
        res.end(JSON.stringify(response))
    }
}

export const allPokemonPage = async (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.readFile('./views/allPokemon.html', null, function(err, data) {
        if (data) {
            res.write(data);
        } else {
            res.writeHead(500)
            res.write(err.message);
        }
        res.end();
    })
}

export const pokemonTypesPage = async (req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    fs.readFile('./views/pokemonTypes.html', null, function(err, data) {
        if (data) {
            res.write(data);
        } else {
            res.writeHead(404)
            res.write(err.message);
        }
        res.end();
    })
}

export const notFound = async (req, res) => {
    res.writeHead(404, { 'Content-Type': 'text/html' });
    res.write('Page not found');
    res.end();
}
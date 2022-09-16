import mongoose from 'mongoose';
import fetch from 'node-fetch';
import Pokemon from './models/pokemon.js'

mongoose.connect('mongodb://localhost:27017');

var allPokemons = [];
var conn = mongoose.connection;
function insertDocs(pokemon) {
    var types = pokemon.types;

    for (let i = 0; i < types.length; i++) {
        var type = types[i]
        conn.collection(type).insertOne(pokemon);
    }
}

export const initialFetch = async (req, res) => {
    const initial = await fetch('https://pokeapi.co/api/v2/pokemon?offset=0&limit=50', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    });

    const pokedexesTemp = await initial.json();
    const pokedexes = pokedexesTemp.results;

    for (let i = 0; i < pokedexes.length; i++) {
        const pokemonUrl = pokedexes[i].url;

        var details = await fetch(pokemonUrl, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' }
        });

        const pokeDetails = await details.json();

        var id = pokeDetails.id;
        var name = pokeDetails.name;
        var species = pokeDetails.species.name;
        var types = [];
        var abilities = [];

        for (let i = 0; i < pokeDetails.types.length; i++) {
            types[i] = pokeDetails.types[i]['type'].name
        }

        for (let i = 0; i < pokeDetails.abilities.length; i++) {
            abilities[i] = pokeDetails.abilities[i]['ability'].name
        }

        var pokedex = {
            '_id': id,
            'id': name,
            'name': name,
            'species': species,
            'types': types,
            'abilities': abilities
        }

        allPokemons.push(pokedex)

        try {
            const newPokemon = new Pokemon(pokedex)
            await newPokemon.save();
        } catch (err) {
            console.log(err)
        }
    }
    allPokemons.forEach(insertDocs)
}

import mongoose from 'mongoose';

const pokemonSchema = mongoose.Schema({
    _id: Number,
    id: String,
    name: String,
    species: String,
    types: [{
        type: String,
        required: true
    }],
    abilities: [{
        type: String,
        required: true
    }]
})

const Pokemon = mongoose.model('pokemon', pokemonSchema)

export default Pokemon;
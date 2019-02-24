import fetch from 'isomorphic-fetch';


export function getMyPokemon(){
    return {
        type: 'GET_MY_POKEMON'
    }
}

export function addMyPokemon(value){
    return {
        type: 'SET_MY_POKEMON',
        myPokemon: value
    }
}

export function removeMyPokemon(value){
    return {
        type: 'REMOVE_MY_POKEMON',
        myPokemon: value
    }
}

export function getAllPokemon(){
    let url = 'http://localhost:3030/api/cards?limit=20'
    return {
        type: 'GET_ALL_POKEMON',
        promise: fetch(url,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
    }
}

export function getPokemon(params){
    const { name } = params
    let url = `http://localhost:3030/api/cards?limit=20&name=${name}&type=normal`
    return {
        type: 'GET_POKEMON',
        promise: fetch(url,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
    }
}

export function removePokemonList(value){
    return {
        type: 'REMOVE_POKEMON_LIST',
        pokemonList: value
    }
}

export function addPokemonList(value){
    return {
        type: 'ADD_POKEMON_LIST',
        pokemonList: value
    }
}

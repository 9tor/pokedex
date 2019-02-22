import fetch from 'isomorphic-fetch';


export function getMyPokemon(){
    let url = 'http://localhost:3030/api/cards?limit=20&name=Deoxys'
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

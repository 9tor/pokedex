const initialState = {
	pokemonMyCard:[], pokemonCardAll:[]
}

export default function(state = initialState, action) {
	switch(action.type) {
		case 'GET_POKEMON':
			return {...state, pokemonCardAll: action.data.cards }
		case 'ADD_POKEMON_LIST':
			return {...state,  pokemonCardAll: action.pokemonList}
		case 'REMOVE_MY_POKEMON':
			return {...state,  pokemonMyCard: action.myPokemon};
		case 'REMOVE_POKEMON_LIST':
			return {...state,  pokemonCardAll: action.pokemonList}
		case 'SET_MY_POKEMON':
			return {...state,  pokemonMyCard: action.myPokemon};
		case 'GET_ALL_POKEMON':
			return {...state, pokemonCardAll: action.data.cards }
		case 'GET_MY_POKEMON':
			return {...state}
		default:
			return state
	}
}

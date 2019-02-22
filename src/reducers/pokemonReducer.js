const initialState = {
	pokemonMyCard:[], pokemonCardAll:[]
}

export default function(state = initialState, action) {
	switch(action.type) {
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

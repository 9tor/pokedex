const initialState = {};

export default function(state = initialState, action) {
	switch(action.type) {
		case 'GET_POKEMON':
		console.log('data',action.data);
			return action.data || state;
		case 'GET_ARTICLE_LATEST':
			return initialState;
		default:
			return state;
	}
}

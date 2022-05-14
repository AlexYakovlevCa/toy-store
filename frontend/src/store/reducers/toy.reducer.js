


const initialState = {
    toys: null
}

export function toyReducer(state = initialState, action = {}) {
    let toys
    switch (action.type) {
        case 'SET_TOYS':
            toys = action.toys ? action.toys : []
            return { ...state, toys }
        case 'ADD_TOY':
            toys = [...state.toys, action.toy]
            return { ...state, toys }
        case 'UPDATE_TOY':
            toys = state.toys.map(currToy =>
                (currToy._id === action.toy._id) ? action.toy : currToy)
            return { ...state, toys }
        case 'REMOVE_TOY':
            toys = state.toys.filter(toy => toy._id !== action.toyId)
            return { ...state, toys }
        default:
            return state
    }
}
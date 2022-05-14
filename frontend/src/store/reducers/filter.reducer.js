const initialState = {
    filterBy: {
        label:null,
        price:null,
        pageIdx:0
    }

}

export function filterReducer(state = initialState, action) {
    switch (action.type) {
        case 'UPDATE_FILTER':
            return { ...state, filterBy: action.filterBy }
        default:
            return state
    }

}